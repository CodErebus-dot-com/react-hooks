import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PACKAGE_JSON = path.join(process.cwd(), 'package.json');
const TEMPLATE_DIR = path.join(__dirname, '..', 'template');

export { PACKAGE_JSON, TEMPLATE_DIR, __dirname };
