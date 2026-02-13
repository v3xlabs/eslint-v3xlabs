import eslintJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            'lib/**',
            'create/lib/**',
            'eslint.project1.config.mjs',
            'eslint.project2.config.mjs',
        ],
    },
    eslintJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
        plugins: {
            import: pluginImport,
            'simple-import-sort': eslintPluginSimpleImportSort,
            'unused-imports': eslintPluginUnusedImports,
            sonarjs: eslintPluginSonarjs,
            unicorn: eslintPluginUnicorn,
            '@stylistic': stylistic,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            'no-restricted-syntax': [
                'error',
                {
                    selector: "Identifier[name='id']",
                    message:
                        'Use a descriptive identifier like user_id, blogpost_id, session_id, etc.',
                },
            ],
            'import/no-default-export': 'error',
            'import/no-duplicates': 'error',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',
            'linebreak-style': ['error', 'unix'],
            'object-curly-spacing': ['error', 'always'],
            'no-multiple-empty-lines': ['warn', { max: 2 }],
            'max-lines': ['error', 500],
            'no-control-regex': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'sonarjs/cognitive-complexity': ['error', 15],
            'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
            'sonarjs/no-identical-functions': 'error',
            'unicorn/no-array-for-each': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/prefer-at': 'off',
            'unicorn/prefer-module': 'off',
            'unicorn/prefer-node-protocol': 'error',
            'unicorn/no-array-callback-reference': 'off',
            'unicorn/prefer-spread': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/expiring-todo-comments': 'off',
            'unicorn/filename-case': 'off',
            '@stylistic/padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: ['return', 'if', 'switch', 'try', 'for'],
                },
                {
                    blankLine: 'always',
                    prev: ['if', 'switch', 'try', 'const', 'let'],
                    next: '*',
                },
                {
                    blankLine: 'any',
                    prev: ['const', 'let'],
                    next: ['const', 'let'],
                },
            ],
        },
    },
    {
        files: ['src/index.ts'],
        rules: {
            'import/no-default-export': 'off',
        },
    },
];
