// functions/api/auth.js
// POST /api/auth — login with password, receive JWT
import { json, err, options, signJWT, sha256 } from '../_utils.js';

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); }
  catch { return err('Invalid JSON', 400); }

  const { password } = body;
  if (!password) return err('Password required', 400);

  // Compare SHA-256 hash of submitted password with stored hash
  // ADMIN_PASSWORD_HASH is set via: npx wrangler pages secret put ADMIN_PASSWORD_HASH
  const submitted = await sha256(password);
  if (submitted !== env.ADMIN_PASSWORD_HASH) {
    // Small artificial delay to slow brute force
    await new Promise(r => setTimeout(r, 500));
    return err('Invalid password', 401);
  }

  // Issue JWT valid for 24 hours
  const token = await signJWT(
    { admin: true, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 },
    env.JWT_SECRET
  );

  return json({ token, expires_in: 86400 });
}

export async function onRequestOptions() { return options(); }
