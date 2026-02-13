# Code Structure Guidance

Use these principles when creating or refactoring code:

## Design style

- Prefer factories and composable functions over classes
- Keep module responsibilities explicit and narrow
- Compose behavior with helpers instead of inheritance

## TypeScript conventions

- Prefer `type` over `interface` in most cases
- Keep types near usage sites instead of central type dumps
- Prefer arrow function declarations (`const fn = (...) => {}`)
- Avoid `as unknown` except at explicit interop boundaries
- Use discriminated unions where they improve exhaustiveness

## Naming and compatibility

- Use descriptive names for IDs and references (`user_id`, `session_id`)
- Preserve required snake_case event contracts for compatibility
- Use consistent casing:
    - `camelCase` for values and functions
    - `PascalCase` for types and components
    - `kebab-case` for package and directory names
