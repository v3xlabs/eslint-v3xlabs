import * as unicorn from 'eslint-plugin-unicorn';

// eslint-disable-next-line unicorn/prefer-module
export = {
    rules: unicorn.rules,
    configs: {
        recommended: {
            ...unicorn.configs.recommended,
            extends: [
                'plugin:unicorn/recommended',
                'plugin:sonarjs/recommended',
                'eslint:recommended',
                'plugin:prettier/recommended',
                'plugin:jsx-a11y/recommended',
            ],
            plugins: [
                'unicorn',
                'simple-import-sort',
                'sonarjs',
                'unused-imports',
                'prefer-arrow',
                'jsx-a11y',
            ],
            rules: {
                ...unicorn.configs.recommended.rules,
                quotes: ['error', 'single'],
                semi: ['error', 'always'],
                indent: 'off',
                'linebreak-style': ['error', 'unix'],
                'unicorn/prefer-spread': 'off',
                'unicorn/expiring-todo-comments': 'off',
                'simple-import-sort/imports': 'error',
                'simple-import-sort/exports': 'error',
                'no-unused-vars': 'off',
                'sonarjs/cognitive-complexity': ['error', 15],
                'sonarjs/no-duplicate-string': 'error',
                'no-var': 'error',
                'prefer-destructuring': 'warn',
                'prefer-arrow-callback': 'warn',
                'prefer-const': 'error',
                'no-useless-return': 'warn',
                'padding-line-between-statements': [
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
                'object-curly-spacing': ['error', 'always'],
                'unicorn/filename-case': 'off',
                'unicorn/prefer-at': 'off',
                'unicorn/no-array-callback-reference': 'off',
                'unicorn/prefer-module': 'off',
                'no-nested-ternary': 'off',
                'no-unneeded-ternary': 'warn',
                '@typescript-eslint/no-unused-vars': 'off',
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
                'unicorn/no-array-reduce': 'off',
            },
        },
    },
};
