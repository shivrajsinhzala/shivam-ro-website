// functions/_middleware.js
// Cloudflare Pages Edge Middleware:
// Redirects any *.pages.dev traffic and www subdomain to the official custom domain https://shivamwatersolution.in using 308 (method-preserving redirect).

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();

  // 1. Redirect any .pages.dev domain to https://shivamwatersolution.in
  if (hostname.endsWith('.pages.dev')) {
    const targetUrl = new URL(request.url);
    targetUrl.protocol = 'https:';
    targetUrl.hostname = 'shivamwatersolution.in';
    targetUrl.port = '';

    // Use 308 to preserve HTTP method (POST/PUT/PATCH) and request payload
    return Response.redirect(targetUrl.toString(), 308);
  }

  // 2. Redirect www.shivamwatersolution.in to apex shivamwatersolution.in
  if (hostname === 'www.shivamwatersolution.in') {
    const targetUrl = new URL(request.url);
    targetUrl.protocol = 'https:';
    targetUrl.hostname = 'shivamwatersolution.in';
    targetUrl.port = '';

    return Response.redirect(targetUrl.toString(), 308);
  }

  // 3. Continue to the requested page or API handler
  return next();
}
