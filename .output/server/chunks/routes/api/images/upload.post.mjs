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

const upload_post = eventHandler(async (event) => {
  await requireUserSession(event);
  return hubBlob().handleUpload(event, {
    multiple: false,
    put: {
      addRandomSuffix: true
    },
    ensure: {
      maxSize: "8MB",
      types: ["image/jpeg", "image/png", "image/gif", "image/heic", "image/webp"]
    }
  });
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
