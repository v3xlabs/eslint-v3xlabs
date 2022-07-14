# Javascript Style Guide

The Official [lvkdotsh](https://github.com/lvkdotsh) javascript/typescript style-guide and linting rules.

## Create command

The lvkdotsh styleguide comes with a helpful `create` command that will help you setup your project with the style guide.

The create utility tries to detect which nodejs package manager you are using but if it fails to do such it will prompt you to choose between `npm, pnpm and yarn`.

If you have not setup a project yet in your working folder, it will provide you the option to initialize a new project. This creates a `package.json` file in your working folder and proceeds to install the style guide dependencies. (`eslint`, `eslint-plugin-lvksh`, `typescript`, `@typescript-eslint/parser`).

When done you should also find a `.eslintrc.json` file and a `.prettierrc` file in your working folder following our style guide.

### PNPM
```sh
pnpm create eslint-lvksh
```

### Yarn
```sh
yarn create eslint-lvksh
```

### NPM
```sh
npm create eslint-lvksh
```

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
