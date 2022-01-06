const unicorn = require('eslint-plugin-unicorn');

module.exports = {
    rules: unicorn.rules,
    configs: {
        recommended: {
            ...unicorn.configs.recommended,
            extends: [
                "plugin:unicorn/recommended",
                "plugin:sonarjs/recommended",
                "eslint:recommended",
            ],
            plugins: [
                "unicorn",
                "simple-import-sort",
                "sonarjs",
                "jest",
            ],
            rules: {
                ...unicorn.configs.recommended.rules,
                "quotes": ["error", "single"],
                "semi": ["error", "always"],
                "linebreak-style": ["error", "unix"],
                "indent": ["error", 4],
                "unicorn/prefer-spread": "off",
                "simple-import-sort/imports": "error",
                "simple-import-sort/exports": "error",
                "no-unused-vars": "off",
                "sonarjs/cognitive-complexity": "off",
                "sonarjs/no-duplicate-string": "off",
                "no-var": "error",
                "prefer-destructuring": "warn",
                "prefer-arrow-callback": "warn",
                "prefer-const": "error",
                "no-useless-return": "warn",
                "padding-line-between-statements": [
                    "error",
                    {
                        "blankLine": "always",
                        "prev": "*",
                        "next": ["return", "if", "switch", "try", "for"]
                    },
                    {
                        "blankLine": "always",
                        "prev": ["if", "switch", "try", "const", "let"],
                        "next": "*"
                    },
                    {
                        "blankLine": "any",
                        "prev": ["const", "let"],
                        "next": ["const", "let"]
                    }
                ],
                "object-curly-spacing": [
                    "error",
                    "always"
                ]
            }
        }
    }
}