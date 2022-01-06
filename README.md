# Javascript Style Guide

The Official [lvkdotsh](https://github.com/lvkdotsh) javascript/typescript style-guide and linting rules.

## Installation

Using `npm`:

```sh
npm install --save-dev eslint eslint-plugin-lvksh
```

or if you prefer to use the `yarn` package manager:

```sh
yarn add -D eslint eslint-plugin-lvksh
```

## Usage

Recommended `.eslintrc.json`:
```json
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2021
    },
    "extends": [
        "plugin:lvksh/recommended"
    ],
    "ignorePatterns": ["!**/*"],
    "plugins": ["lvksh"],
    "env": {
        "node": true
    },
    "rules": {}
}
```

The linting command you probably want to use. (Add this to your scripts section)
```
"lint": "eslint -c .eslintrc.json --ext .ts ./src"
```
Or if your project also has tests
```
"lint": "eslint -c .eslintrc.json --ext .ts ./src ./tests"
```

You might also have to install `@typescript-eslint/parser`, and probably `typescript`.

In addition to the above a `.prettierrc` file is also recommended with the following contents.
```json
{
    "tabWidth": 4,
    "useTabs": false,
    "singleQuote": true
}
```

## Contributors

[![](https://contrib.rocks/image?repo=lvkdotsh/javascript)](https://github.com/lvkdotsh/javascript/graphs/contributors)

## LICENSE

This package is licensed under the [MIT](https://opensource.org/licenses/MIT).
