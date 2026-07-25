import { defineConfig } from 'eslint/config';
import v3xlint from './lib/index.js';

export default defineConfig([
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            'lib/**',
            'create/lib/**',
            'examples/eslint.project1.config.mjs',
            'examples/eslint.project2.config.mjs',
        ],
    },
    ...v3xlint.configs['recommended'],
]);
