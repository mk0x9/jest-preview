import fs from 'fs';
import { CACHE_FOLDER } from './constants';

// Create cache folder if it doesn't exist
export function createCacheFolderIfNeeded() {
  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }
}

// Returns string representations of the doctype of the document
export function serializeDoctypeToString(document: Document): string {
  if (!document.doctype) {
    return '';
  }

  // jsdom, or other dom-in-js implementation used might have issues, wrapping
  // with try/catch to be on the safe side
  try {
    return new XMLSerializer().serializeToString(document.doctype);
  } catch {
    return '';
  }
}
