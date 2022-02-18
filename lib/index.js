"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const unicorn = __importStar(require("eslint-plugin-unicorn"));
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    rules: unicorn.rules,
    configs: {
        recommended: Object.assign(Object.assign({}, unicorn.configs.recommended), { extends: [
                'plugin:unicorn/recommended',
                'plugin:sonarjs/recommended',
                'eslint:recommended',
                'plugin:prettier/recommended',
            ], plugins: [
                'unicorn',
                'simple-import-sort',
                'sonarjs',
                'jest',
                'unused-imports',
            ], rules: Object.assign(Object.assign({}, unicorn.configs.recommended.rules), { quotes: ['error', 'single'], semi: ['error', 'always'], indent: 'off', 'linebreak-style': ['error', 'unix'], 'unicorn/prefer-spread': 'off', 'simple-import-sort/imports': 'error', 'simple-import-sort/exports': 'error', 'no-unused-vars': 'off', 'sonarjs/cognitive-complexity': ['error', 15], 'sonarjs/no-duplicate-string': 'error', 'no-var': 'error', 'prefer-destructuring': 'warn', 'prefer-arrow-callback': 'warn', 'prefer-const': 'error', 'no-useless-return': 'warn', 'padding-line-between-statements': [
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
                ], 'object-curly-spacing': ['error', 'always'], 'unicorn/filename-case': 'off', 'unicorn/prefer-at': [
                    'error',
                    {
                        checkAllIndexAccess: true,
                    },
                ], 'unicorn/no-array-callback-reference': 'off', 'unicorn/prefer-module': 'off', 'no-nested-ternary': 'off', 'no-unneeded-ternary': 'warn', '@typescript-eslint/no-unused-vars': 'off', 'unused-imports/no-unused-imports': 'error', 'unused-imports/no-unused-vars': [
                    'warn',
                    {
                        vars: 'all',
                        varsIgnorePattern: '^_',
                        args: 'after-used',
                        argsIgnorePattern: '^_',
                    },
                ] }) }),
    },
};
