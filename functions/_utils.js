// functions/_utils.js
// Shared utilities: JWT, CORS, response helpers

// CORS headers
export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

export function err(msg, status = 400) {
  return json({ error: msg }, status);
}

export function options() {
  return new Response(null, { status: 204, headers: CORS });
}

// JWT (HS256 using Web Crypto)
function b64url(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function b64urlBuf(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function b64urlDecode(str) {
  const s = str.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(s), c => c.charCodeAt(0));
}

async function hmacKey(secret, usage) {
  return crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, [usage]
  );
}

export async function signJWT(payload, secret) {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body   = b64url(JSON.stringify(payload));
  const data   = `${header}.${body}`;
  const key    = await hmacKey(secret, 'sign');
  const sig    = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return `${data}.${b64urlBuf(sig)}`;
}

export async function verifyJWT(token, secret) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  try {
    const key   = await hmacKey(secret, 'verify');
    const valid = await crypto.subtle.verify(
      'HMAC', key,
      b64urlDecode(sig),
      new TextEncoder().encode(`${header}.${body}`)
    );
    if (!valid) return null;
    const payload = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp && payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch { return null; }
}

export async function requireAuth(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  return verifyJWT(token, env.JWT_SECRET);
}

export function parseProduct(row) {
  const rawImages = safeJSON(row.images, []);
  const images = rawImages.map(img => {
    if (img && !img.startsWith('/') && !img.startsWith('http://') && !img.startsWith('https://')) {
      return '/' + img;
    }
    return img;
  });
  const features_en = safeJSON(row.features_en, []);
  const features_gu = safeJSON(row.features_gu, []);
  const specs_en = safeJSON(row.specs_en, {});
  const specs_gu = safeJSON(row.specs_gu, {});
  return {
    ...row,
    images,
    features_en,
    features_gu,
    specs_en,
    specs_gu,
    name:        row.name_en,
    badge:       row.badge_en,
    tagline:     row.tagline_en,
    capacity:    row.capacity_en,
    warranty:    row.warranty_en,
    description: row.description_en,
    features:    features_en,
    specs:       specs_en
  };
}

function safeJSON(str, fallback) {
  try { return JSON.parse(str); } catch { return fallback; }
}

export async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
