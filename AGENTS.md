## Coding Standards
Baseline rules carried from prior project guidance and aligned to this repo.

### Architectural style
- Prefer function-oriented and factory-oriented design
- Avoid classes except narrow runtime integration points
- Prefer explicit composition (`createX`, helper combinators) over inheritance
- Keep module boundaries explicit between signaling/transport/session/provider layers

### TypeScript style
- Prefer `type` over `interface` in general
- Keep types close to usage; avoid central type dump files
- Prefer `const fn = (...) => {}` for most function definitions
- Minimize `as unknown` casts; restrict them to interop boundaries
- Use discriminated unions and `ts-pattern` where it improves exhaustiveness and clarity
- Use descriptive identifiers; avoid generic `id` names

### Naming
- `camelCase`: variables/functions
- `PascalCase`: types/components
- kebab-case: directories/packages
- Existing event names use snake_case (`state_change`, `settings_change`) and should be preserved for compatibility
