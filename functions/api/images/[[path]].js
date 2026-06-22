// functions/api/images/[[path]].js
// Serve images from R2 bucket
import { err, options } from '../../_utils.js';

export async function onRequestGet({ params, env }) {
  const key = params.path.join('/');
  const object = await env.IMAGES.get(key);
  if (!object) return err('Image not found', 404);

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return new Response(object.body, { headers });
}

export async function onRequestOptions() { return options(); }
