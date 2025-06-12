import { g as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'vue-router';
import 'tailwind-merge';
import '@iconify/vue';
import '@vue/shared';
import 'vue/server-renderer';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
const auth = defineNuxtRouteMiddleware(async (to) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return navigateTo("/login");
  }
  const payload = parseJwt(token);
  if (!payload || !payload.role) {
    localStorage.removeItem("token");
    return navigateTo("/login");
  }
  if (to.path.startsWith("/admin") && payload.role !== "admin") {
    return navigateTo("/user");
  } else if (to.path.startsWith("/user") && payload.role !== "user") {
    return navigateTo("/admin");
  }
  return;
});

export { auth as default };
//# sourceMappingURL=auth-DW0qBCAj.mjs.map
