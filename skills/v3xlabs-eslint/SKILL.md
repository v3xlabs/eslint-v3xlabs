---
name: v3xlabs-eslint
description: Apply v3xlabs JavaScript and TypeScript code structure, naming, and ESLint v9 style guidance.
metadata:
    tags: javascript, typescript, eslint, style, architecture, linting
---

# v3xlabs ESLint Skill

Use this skill when working on JavaScript or TypeScript repositories that should follow v3xlabs structure and linting conventions.

## When to use

- Adding or updating ESLint config in JS/TS projects
- Standardizing on ESLint v9 flat config across repositories
- Refactoring code to match v3xlabs style and naming
- Reviewing pull requests for structural and lint-rule alignment

## Core conventions

- Prefer function-oriented and factory-oriented design
- Avoid classes except narrow runtime integration points
- Prefer explicit composition (`createX`, helper combinators)
- Keep boundaries clear between signaling, transport, session, and provider layers
- Prefer `type` over `interface` in TypeScript
- Keep types close to usage
- Prefer `const fn = (...) => {}` for function declarations
- Use descriptive identifiers and avoid generic `id`
- Use `camelCase` for variables/functions and `PascalCase` for types/components
- Keep event names in snake_case when compatibility requires it (`state_change`, `settings_change`)

## ESLint setup (v9)

Install:

```bash
npm install --save-dev eslint eslint-plugin-v3xlabs
```

Create `eslint.config.mjs`:

```js
import v3xlabs from 'eslint-plugin-v3xlabs';

export default [...v3xlabs.configs['flat/recommended']];
```

Use lint script:

```json
{
    "scripts": {
        "lint": "eslint ."
    }
}
```

## How to apply this skill during coding

1. Read existing lint config and identify flat vs legacy format.
2. If legacy, migrate to flat config and keep project-specific overrides.
3. Apply v3xlabs naming and composition patterns while editing code.
4. Keep formatting strict; do not relax newline and spacing rules unless requested.
5. Run lint and fix all violations before finalizing.

## References

- [rules/eslint-preset.md](rules/eslint-preset.md)
- [rules/code-structure.md](rules/code-structure.md)
