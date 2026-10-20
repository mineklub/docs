# Linting

Run `npm run lint` to check source files or `npm run lint:fix` to apply safe fixes. Both commands fail on warnings. Oxlint is pinned to 1.89.0; `.oxlintrc.json` contains the migrated rule settings and exceptions.

Generated output and dependency directories are excluded.

Existing formatting commands remain separate; Oxlint does not replace Prettier or unsupported stylistic rules. Type checking and builds remain independent checks.

Oxlint checks supported JavaScript/TypeScript and Astro script content, not full Astro templates. Keep `npm run typecheck` (`astro check`) for framework validation.


## Migration validation (2026-10-20)

- Clean `npm ci`, strict lint, Astro type checking (zero errors/warnings), and production build pass. Both build workflows run lint.
