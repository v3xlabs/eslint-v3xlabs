import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import type { ESLint, Linter } from 'eslint';
import pluginImport from 'eslint-plugin-import';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const sortVitest: Linter.Config = {
    files: [
        '**/vitest.config.{js,ts,mts}',
        '**/wxt.config.{js,ts,mts}',
        '**/vite.config.{js,ts,mts}',
    ],
    rules: {
        'import/no-default-export': 'off',
    },
};

const tsImportSort: Linter.Config = {
    ignores: ['**/dist/**', '**/out/**', '**/node_modules/**'],
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,mts}'],
    plugins: {
        import: pluginImport,
        'simple-import-sort': eslintPluginSimpleImportSort,
        'unused-imports': eslintPluginUnusedImports,
    },
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
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
    },
};

const tsStylistic: Linter.Config = stylistic.configs['recommended-flat'];

const tsJsEs: Linter.Config[] = [
    {
        rules: eslint.configs.recommended.rules,
    },
    ...tseslint.configs.recommended,
];

const tsOther: Linter.Config = {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,mts}'],
    plugins: {
        unicorn: eslintPluginUnicorn,
    },
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
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
        quotes: ['error', 'double'],
        semi: ['error', 'always'],
        'no-var': 'error',
        'prefer-const': 'error',
        'func-style': ['error', 'expression'],
        'prefer-arrow-callback': ['error'],
        'arrow-body-style': ['error', 'as-needed'],
        'linebreak-style': ['error', 'unix'],
        'object-curly-spacing': ['error', 'always'],
        'no-multiple-empty-lines': ['warn', { max: 2 }],
        'max-lines': ['error', 500],
        'no-control-regex': 'off',
        'no-nested-ternary': 'off',
        'no-unneeded-ternary': 'warn',
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
        '@stylistic/quotes': ['error', 'double'],
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/no-confusing-arrow': 'error',
        '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
        '@stylistic/newline-per-chained-call': 'error',
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
        '@stylistic/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
            },
        ],
    },
};

const plugin: ESLint.Plugin & {
    configs: { sort: Linter.Config[]; recommended: Linter.Config[] };
} = {
    rules: {},
    configs: {
        sort: [sortVitest, tsImportSort],
        recommended: [
            ...tsJsEs,
            sortVitest,
            tsImportSort,
            tsStylistic,
            tsOther,
        ],
    },
};

export default plugin;
