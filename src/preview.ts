import fs from 'fs';
import path from 'path';
import { CACHE_FOLDER } from './constants';
import { serializeDoctypeToString } from './utils';

export function debug(): void {
  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  const outHTML =
    serializeDoctypeToString(document) + document.documentElement.outerHTML;

  fs.writeFileSync(path.join(CACHE_FOLDER, 'index.html'), outHTML);
}
