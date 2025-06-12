import { e as eventHandler } from '../../_/nitro.mjs';
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

const index_get = eventHandler(async () => {
  const { blobs } = await hubBlob().list({
    limit: 1e3
  });
  return blobs;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
