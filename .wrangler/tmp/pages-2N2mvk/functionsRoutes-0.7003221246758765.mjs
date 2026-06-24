import { onRequestDelete as __api_products__id__js_onRequestDelete } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/products/[id].js"
import { onRequestGet as __api_products__id__js_onRequestGet } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/products/[id].js"
import { onRequestOptions as __api_products__id__js_onRequestOptions } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/products/[id].js"
import { onRequestPut as __api_products__id__js_onRequestPut } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/products/[id].js"
import { onRequestGet as __api_images___path___js_onRequestGet } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/images/[[path]].js"
import { onRequestOptions as __api_images___path___js_onRequestOptions } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/images/[[path]].js"
import { onRequestOptions as __api_auth_js_onRequestOptions } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/auth.js"
import { onRequestPost as __api_auth_js_onRequestPost } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/auth.js"
import { onRequestGet as __api_products_js_onRequestGet } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/products.js"
import { onRequestOptions as __api_products_js_onRequestOptions } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/products.js"
import { onRequestPatch as __api_products_js_onRequestPatch } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/products.js"
import { onRequestPost as __api_products_js_onRequestPost } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/products.js"
import { onRequestOptions as __api_upload_js_onRequestOptions } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/upload.js"
import { onRequestPost as __api_upload_js_onRequestPost } from "/Users/shivrajsinhzala/Documents/Shivam RO website/functions/api/upload.js"

export const routes = [
    {
      routePath: "/api/products/:id",
      mountPath: "/api/products",
      method: "DELETE",
      middlewares: [],
      modules: [__api_products__id__js_onRequestDelete],
    },
  {
      routePath: "/api/products/:id",
      mountPath: "/api/products",
      method: "GET",
      middlewares: [],
      modules: [__api_products__id__js_onRequestGet],
    },
  {
      routePath: "/api/products/:id",
      mountPath: "/api/products",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_products__id__js_onRequestOptions],
    },
  {
      routePath: "/api/products/:id",
      mountPath: "/api/products",
      method: "PUT",
      middlewares: [],
      modules: [__api_products__id__js_onRequestPut],
    },
  {
      routePath: "/api/images/:path*",
      mountPath: "/api/images",
      method: "GET",
      middlewares: [],
      modules: [__api_images___path___js_onRequestGet],
    },
  {
      routePath: "/api/images/:path*",
      mountPath: "/api/images",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_images___path___js_onRequestOptions],
    },
  {
      routePath: "/api/auth",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_auth_js_onRequestOptions],
    },
  {
      routePath: "/api/auth",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_js_onRequestPost],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_products_js_onRequestGet],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_products_js_onRequestOptions],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "PATCH",
      middlewares: [],
      modules: [__api_products_js_onRequestPatch],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_products_js_onRequestPost],
    },
  {
      routePath: "/api/upload",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_upload_js_onRequestOptions],
    },
  {
      routePath: "/api/upload",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_upload_js_onRequestPost],
    },
  ]