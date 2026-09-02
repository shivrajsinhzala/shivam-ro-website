// functions/api/products.js
import { json, err, options, requireAuth, parseProduct } from '../_utils.js';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const includeAll = url.searchParams.get('all') === 'true';
  const auth = await requireAuth(request, env);

  // If authorized admin or explicitly requesting all products with query
  if (auth || includeAll) {
    const { results } = await env.DB.prepare(
      'SELECT * FROM products ORDER BY sort_order ASC, created_at DESC'
    ).all();
    return json(results.map(parseProduct));
  }

  // Public visitors only see active products
  const { results } = await env.DB.prepare(
    'SELECT * FROM products WHERE is_active = 1 OR is_active IS NULL ORDER BY sort_order ASC, created_at DESC'
  ).all();
  return json(results.map(parseProduct));
}

export async function onRequestPost({ request, env }) {
  const auth = await requireAuth(request, env);
  if (!auth) return err('Unauthorized', 401);

  let p;
  try { p = await request.json(); }
  catch { return err('Invalid JSON', 400); }

  if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) return err('Valid product ID required (lowercase, numbers, hyphens)', 400);
  if (!p.name_en) return err('name_en required', 400);

  const existing = await env.DB.prepare('SELECT id FROM products WHERE id = ?').bind(p.id).first();
  if (existing) return err(`Product with ID "${p.id}" already exists`, 409);

  // Place newly added products at the top
  const minRow = await env.DB.prepare('SELECT MIN(sort_order) as m FROM products').first();
  const currentMin = (minRow?.m !== null && minRow?.m !== undefined) ? minRow.m : 0;
  const sortOrder = currentMin <= 0 ? currentMin - 10 : 0;
  const isActive = (p.is_active === 0 || p.is_active === false || p.is_active === '0') ? 0 : 1;

  await env.DB.prepare(`
    INSERT INTO products
      (id, name_en, name_gu, badge_en, badge_gu, category,
       images, tagline_en, tagline_gu, capacity_en, capacity_gu,
       warranty_en, warranty_gu, description_en, description_gu,
       features_en, features_gu, specs_en, specs_gu,
       meta_title, meta_desc, sort_order, is_active)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `).bind(
    p.id, p.name_en, p.name_gu || '',
    p.badge_en || '', p.badge_gu || '',
    p.category || 'domestic',
    JSON.stringify(p.images || []),
    p.tagline_en || '', p.tagline_gu || '',
    p.capacity_en || '', p.capacity_gu || '',
    p.warranty_en || '', p.warranty_gu || '',
    p.description_en || '', p.description_gu || '',
    JSON.stringify(p.features_en || []),
    JSON.stringify(p.features_gu || []),
    JSON.stringify(p.specs_en || {}),
    JSON.stringify(p.specs_gu || {}),
    p.meta_title || '', p.meta_desc || '',
    sortOrder,
    isActive
  ).run();

  return json({ success: true, id: p.id }, 201);
}

export async function onRequestPatch({ request, env }) {
  const auth = await requireAuth(request, env);
  if (!auth) return err('Unauthorized', 401);

  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON', 400); }

  // 1. Reordering by array of product IDs
  if (Array.isArray(body.order)) {
    const stmts = body.order.map((id, idx) =>
      env.DB.prepare('UPDATE products SET sort_order = ? WHERE id = ?').bind(idx * 10, id)
    );
    await env.DB.batch(stmts);
    return json({ success: true, message: 'Product order saved' });
  }

  // 2. Toggle active visibility: { id: "...", is_active: 0 | 1 }
  if (body.id && body.is_active !== undefined) {
    const isActive = (body.is_active === 0 || body.is_active === false || body.is_active === '0') ? 0 : 1;
    await env.DB.prepare('UPDATE products SET is_active = ? WHERE id = ?').bind(isActive, body.id).run();
    return json({ success: true, id: body.id, is_active: isActive });
  }

  return err('Invalid patch payload', 400);
}

export async function onRequestOptions() { return options(); }
