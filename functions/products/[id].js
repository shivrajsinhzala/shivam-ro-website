export async function onRequest({ request, params }) {
  const { id } = params;
  const url = new URL(request.url);
  url.pathname = '/products';
  url.searchParams.set('id', id);
  return Response.redirect(url.toString(), 302);
}
