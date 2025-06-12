import { e as eventHandler, r as readBody, a as getUserSession, c as createError, s as setUserSession } from '../../_/nitro.mjs';
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

const auth_post = eventHandler(async (event) => {
  const body = await readBody(event) || {};
  const session = await getUserSession(event);
  const adminPassword = process.env.NUXT_ADMIN_PASSWORD || "admin";
  if (session.lastAttemptAt && Date.now() - session.lastAttemptAt < 5e3)
    throw createError({ statusCode: 429, statusMessage: "Too Many Requests" });
  if (body.password === adminPassword) {
    await setUserSession(event, {
      user: { role: "admin" }
    });
    return { loggedIn: true };
  }
  await setUserSession(event, { lastAttemptAt: Date.now() });
  throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
});

export { auth_post as default };
//# sourceMappingURL=auth.post.mjs.map
