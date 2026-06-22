// functions/api/products.js
// GET  /api/products  — list all products (public)
// POST /api/products  — create product (admin only)
import { json, err, options, requireAuth, parseProduct } from '../_utils.js';

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    'SELECT * FROM products ORDER BY sort_order ASC, created_at ASC'
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

  // Check duplicate
  const existing = await env.DB.prepare('SELECT id FROM products WHERE id = ?').bind(p.id).first();
  if (existing) return err(`Product "${p.id}" already exists`, 409);

  // Get max sort_order
  const maxRow = await env.DB.prepare('SELECT MAX(sort_order) as m FROM products').first();
  const sortOrder = (maxRow?.m ?? -1) + 1;

  await env.DB.prepare(`
    INSERT INTO products
      (id, name_en, name_gu, badge_en, badge_gu, category,
       images, tagline_en, tagline_gu, capacity_en, capacity_gu,
       warranty_en, warranty_gu, description_en, description_gu,
       features_en, features_gu, specs_en, specs_gu,
       meta_title, meta_desc, sort_order)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
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
    sortOrder
  ).run();

  return json({ success: true, id: p.id }, 201);
}

// Reorder all products (admin only)
// PATCH /api/products — body: { order: ['id1','id2',...] }
export async function onRequestPatch({ request, env }) {
  const auth = await requireAuth(request, env);
  if (!auth) return err('Unauthorized', 401);

  const { order } = await request.json();
  if (!Array.isArray(order)) return err('order array required', 400);

  const stmts = order.map((id, idx) =>
    env.DB.prepare('UPDATE products SET sort_order = ? WHERE id = ?').bind(idx, id)
  );
  await env.DB.batch(stmts);
  return json({ success: true });
}

export async function onRequestOptions() { return options(); }
