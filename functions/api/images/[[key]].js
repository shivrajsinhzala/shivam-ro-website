// functions/api/images/[[key]].js
// GET /api/images/:key — serve images from R2
// Public (images are displayed on the website)
// Supports nested paths: /api/images/products/filename.jpg
import { err } from '../../_utils.js';

export async function onRequest({ params, env, request }) {
  // params.key captures everything after /api/images/ as an array in a catch-all route
  const keySegments = params.key;
  if (!keySegments || (Array.isArray(keySegments) && keySegments.length === 0)) {
    return err('Image key required', 400);
  }

  // Join the array segments back into a single string path
  const key = Array.isArray(keySegments) ? keySegments.join('/') : keySegments;

  const object = await env.IMAGES.get(key);
  if (!object) return err('Image not found', 404);

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('cache-control', 'public, max-age=31536000, immutable'); // Cache 1 year
  headers.set('etag', object.httpEtag);

  // Handle conditional requests
  const ifNoneMatch = request.headers.get('if-none-match');
  if (ifNoneMatch === object.httpEtag) {
    return new Response(null, { status: 304, headers });
  }

  return new Response(object.body, { status: 200, headers });
}
