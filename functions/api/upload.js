// functions/api/upload.js
// POST /api/upload — upload image to R2, returns { url }
// Admin only
import { json, err, options, requireAuth } from '../_utils.js';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function onRequestPost({ request, env }) {
  const auth = await requireAuth(request, env);
  if (!auth) return err('Unauthorized', 401);

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') return err('No file provided', 400);
  if (!ALLOWED_TYPES.includes(file.type)) return err('Only JPEG, PNG, WebP, GIF allowed', 400);
  if (file.size > MAX_SIZE) return err('File too large (max 5MB)', 400);

  // Generate unique filename: timestamp + sanitized original name
  const ext = file.name.split('.').pop().toLowerCase();
  const safeName = file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase()
    .slice(0, 40);
  const key = `products/${Date.now()}-${safeName}.${ext}`;

  // Upload to R2
  const arrayBuffer = await file.arrayBuffer();
  await env.IMAGES.put(key, arrayBuffer, {
    httpMetadata: { contentType: file.type }
  });

  // Return the URL — served via /api/images/:key route
  const url = `/api/images/${key}`;
  return json({ url, key });
}

export async function onRequestOptions() { return options(); }
