# ESLint Preset Rules

The v3xlabs preset is intentionally strict and formatting-heavy.

## Major enforcement areas

- Import hygiene and deterministic ordering (`simple-import-sort`, `import/no-duplicates`)
- Removal of dead imports and unused variables (`unused-imports`)
- Descriptive naming (`no-restricted-syntax` against plain `id`)
- Strong formatting and spacing discipline (`@stylistic/padding-line-between-statements`, single quotes, semicolons)
- Code quality pressure (`sonarjs/*`)
- Modern JavaScript defaults (`unicorn/*` with selected practical overrides)

## Common project overrides

- Allow default exports for config files like `vitest.config.ts` or tooling wrappers
- Raise or lower `max-lines` only per project constraints
- Keep `unicorn/prefer-module` disabled where CommonJS interop is still required

## Recommended migration behavior

- Keep strict defaults during migration
- Port old overrides only when still relevant
- Avoid broad disable comments; scope overrides to specific files
