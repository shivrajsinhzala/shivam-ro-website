// functions/api/auth.js
// POST /api/auth — login with password, receive JWT
import { json, err, options, signJWT, sha256 } from '../_utils.js';

// Hardcoded fallback hashes so authentication is guaranteed to work
// even if environment variables are temporarily missing or unbonded
const KNOWN_HASHES = new Set([
  '07e7a85a3b974dfae01ee9443017505ad729d8306dbb3b708cda764a19a63ed6', // 9925645826
  '5c40c91220af101b502ec6bd4c67298bd310309041a37e56336e7d78abf8a885', // 9173096727 (client mobile number)
  'b87d4035c7253d6ac8e16c6607dcaa8006523abd253cae5bf51311cab48dfad9', // +919173096727
  '6a270323ae1d8cac14befd618105e4f3635a6574909f1296959ea15450b3493b', // +919925645826
]);

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); }
  catch { return err('Invalid JSON', 400); }

  const { password } = body;
  if (!password || typeof password !== 'string') return err('Password required', 400);

  const trimmed = password.trim();
  const digitsOnly = trimmed.replace(/\D/g, '');
  const tenDigits = digitsOnly.length === 12 && digitsOnly.startsWith('91') ? digitsOnly.slice(2) : digitsOnly;

  // Compute hashes for submitted variations (trimmed, digits-only, 10-digit)
  const submittedHash = await sha256(trimmed);
  const digitsHash = digitsOnly ? await sha256(digitsOnly) : null;
  const tenDigitsHash = tenDigits ? await sha256(tenDigits) : null;

  const validHashes = new Set(KNOWN_HASHES);
  if (env.ADMIN_PASSWORD_HASH) validHashes.add(env.ADMIN_PASSWORD_HASH);
  if (env.ADMIN_PASSWORD_HASH_2) validHashes.add(env.ADMIN_PASSWORD_HASH_2);

  const isValid = validHashes.has(submittedHash) ||
                  (digitsHash && validHashes.has(digitsHash)) ||
                  (tenDigitsHash && validHashes.has(tenDigitsHash));

  if (!isValid) {
    await new Promise(r => setTimeout(r, 500));
    return err('Invalid password', 401);
  }

  // Issue JWT valid for 24 hours
  const secret = env.JWT_SECRET || 'shivam-water-solution-jwt-fallback-secret-2026';
  const token = await signJWT(
    { admin: true, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 },
    secret
  );

  return json({ token, expires_in: 86400 });
}

export async function onRequestGet() {
  return json({ status: 'ok', endpoint: '/api/auth', message: 'Send POST request with {"password": "..."} to login' });
}

export async function onRequestOptions() {
  return options();
}
