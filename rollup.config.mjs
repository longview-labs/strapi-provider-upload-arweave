import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { baseConfig } from './rollup.utils.mjs';

const __dirname = path.resolve(fileURLToPath(import.meta.url), '..');
export default baseConfig(__dirname);