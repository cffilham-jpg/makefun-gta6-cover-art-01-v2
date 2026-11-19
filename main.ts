import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-app.ts';

const repository = fileURLToPath(new URL('.', import.meta.url));
const destination = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
const snapshotDirectories = ['app', 'screenshots'];
mkdirSync(destination, { recursive: true });
for (const directory of snapshotDirectories) cpSync(join(repository, directory), join(destination, directory), { recursive: true });
const dossier = buildDossier(destination, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 48 * 1024 * 1024, app_path_max_bytes: 1000 });
writeFileSync(join(destination, 'dossier.json'), dossier);
