import eslintJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import type { ESLint, Linter } from 'eslint';
import pluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const sharedRules = {
    ...eslintPluginUnicorn.configs.recommended.rules,
    'no-restricted-syntax': [
        'error',
        {
            selector: 'Identifier[name="id"]',
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
    'prefer-destructuring': 'warn',
    'prefer-arrow-callback': 'warn',
    'linebreak-style': ['error', 'unix'],
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'max-lines': ['error', 500],
    'no-control-regex': 'off',
    'no-nested-ternary': 'off',
    'no-unneeded-ternary': 'warn',

    'sonarjs/cognitive-complexity': ['error', 15],
    'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
    'sonarjs/no-identical-functions': 'error',

    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

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
};

const flatRecommended = [
    {
        ignores: [
            '**/dist/**',
            '**/.wxt/**',
            '**/node_modules/**',
            '.changeset/**',
            'eslint.config.mjs',
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
        rules: sharedRules,
    },
    {
        files: ['**/vitest.config.ts', '**/wxt.config.ts'],
        rules: {
            'import/no-default-export': 'off',
        },
    },
];

const plugin = {
    rules: {},
    configs: {
        recommended: flatRecommended,
        all: flatRecommended,
    },
} as ESLint.Plugin & {
    configs: {
        recommended: Linter.Config;
        all: Linter.Config;
    };
};

export default plugin;
