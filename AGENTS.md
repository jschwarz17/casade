# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 15** website (TypeScript, Tailwind CSS v4, App Router).

### Key commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (port 3000) |
| Lint | `npm run lint` |
| Test | `npm test` |
| Build | `npm run build` |

### Non-obvious caveats

- **Tailwind CSS v4** uses `@tailwindcss/postcss` plugin (not the older `tailwindcss` PostCSS plugin). CSS imports use `@import "tailwindcss"` instead of `@tailwind` directives.
- **Jest** requires `ts-node` for TypeScript config parsing. The `jsx` setting is overridden to `react-jsx` in `jest.config.ts` (the main `tsconfig.json` uses `preserve` for Next.js).
- **ESLint** uses flat config (`eslint.config.mjs`) with `@eslint/eslintrc` FlatCompat for Next.js integration.
- The `next lint` command shows a deprecation warning (will be removed in Next.js 16) but still works.
