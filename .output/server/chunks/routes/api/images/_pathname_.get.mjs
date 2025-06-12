import { e as eventHandler, d as getValidatedRouterParams } from '../../../_/nitro.mjs';
import z from 'zod';
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

const _pathname__get = eventHandler(async (event) => {
  const { pathname } = await getValidatedRouterParams(event, z.object({
    pathname: z.string().min(1)
  }).parse);
  return hubBlob().serve(event, pathname);
});

export { _pathname__get as default };
//# sourceMappingURL=_pathname_.get.mjs.map
