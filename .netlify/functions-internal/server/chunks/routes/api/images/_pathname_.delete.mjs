import { e as eventHandler, b as requireUserSession } from '../../../_/nitro.mjs';
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

const _pathname__delete = eventHandler(async (event) => {
  await requireUserSession(event);
  const { pathname } = event.context.params || {};
  return hubBlob().del(pathname);
});

export { _pathname__delete as default };
//# sourceMappingURL=_pathname_.delete.mjs.map
