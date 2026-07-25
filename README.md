# v3xlabs ESLint Presets

The official [v3xlabs](https://github.com/v3xlabs) JavaScript and TypeScript lint presets.

This package targets **ESLint v10 flat config only**. To use these rules you must be on the latest ESLint (v10) or newer.

## Quick setup

### Create command

The `create-eslint-v3xlabs` utility sets up linting in an existing or new project.

It will:

- detect your package manager
- install required dev dependencies
- generate `eslint.config.mjs`
- generate or update `.prettierrc`
- add a `lint` script

Use one of:

```sh
bun create eslint-v3xlabs
pnpm create eslint-v3xlabs
yarn create eslint-v3xlabs
npm create eslint-v3xlabs
```

## Installation

```sh
pnpm add -D eslint eslint-plugin-v3xlabs
```

## Usage (ESLint v10)

Create `eslint.config.mjs`:

```js
import v3xlabs from 'eslint-plugin-v3xlabs';

export default [...v3xlabs.configs['flat/recommended']];
```

Recommended `package.json` script:

```json
{
    "scripts": {
        "lint": "eslint ."
    }
}
```

## Opinionated defaults

The preset is intentionally strict and formatting-heavy. It enforces:

- import sorting
- unused import removal
- descriptive identifiers (discourages generic `id`)
- structured empty lines and line breaks
- modern JavaScript and TypeScript rules
- quality gates with SonarJS and Unicorn

## AI skill package

An installable agent skill for this preset lives at `skills/v3xlabs-eslint/SKILL.md`.

It captures:

- ESLint v10 setup flow
- v3xlabs architecture and TypeScript conventions
- naming and formatting expectations for aggressive linting environments

## License

MIT.
