// functions/api/products/[id].js
// GET    /api/products/:id  — single product (public)
// PUT    /api/products/:id  — update product (admin)
// DELETE /api/products/:id  — delete product (admin)
import { json, err, options, requireAuth, parseProduct } from '../../_utils.js';

export async function onRequestGet({ params, env }) {
  const row = await env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(params.id).first();
  if (!row) return err('Product not found', 404);
  return json(parseProduct(row));
}

export async function onRequestPut({ params, request, env }) {
  const auth = await requireAuth(request, env);
  if (!auth) return err('Unauthorized', 401);

  let p;
  try { p = await request.json(); }
  catch { return err('Invalid JSON', 400); }

  const existing = await env.DB.prepare('SELECT id FROM products WHERE id = ?').bind(params.id).first();
  if (!existing) return err('Product not found', 404);

  await env.DB.prepare(`
    UPDATE products SET
      name_en = ?, name_gu = ?, badge_en = ?, badge_gu = ?,
      category = ?, images = ?, tagline_en = ?, tagline_gu = ?,
      capacity_en = ?, capacity_gu = ?, warranty_en = ?, warranty_gu = ?,
      description_en = ?, description_gu = ?,
      features_en = ?, features_gu = ?, specs_en = ?, specs_gu = ?,
      meta_title = ?, meta_desc = ?
    WHERE id = ?
  `).bind(
    p.name_en, p.name_gu || '',
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
    params.id
  ).run();

  return json({ success: true });
}

export async function onRequestDelete({ params, request, env }) {
  const auth = await requireAuth(request, env);
  if (!auth) return err('Unauthorized', 401);

  const existing = await env.DB.prepare('SELECT id FROM products WHERE id = ?').bind(params.id).first();
  if (!existing) return err('Product not found', 404);

  await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(params.id).run();
  return json({ success: true });
}

export async function onRequestOptions() { return options(); }
