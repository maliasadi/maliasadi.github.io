import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

function copyDist(resolveId, folder) {
  const file = fileURLToPath(import.meta.resolve(resolveId));
  const dest = new URL(`../public/vendor/${folder}/`, import.meta.url);
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  cpSync(dirname(file), dest, { recursive: true });
}

copyDist('reveal.js/reveal.css', 'reveal');
copyDist('katex/dist/katex.min.css', 'katex');
