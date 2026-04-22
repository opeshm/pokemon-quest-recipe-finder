# AGENTS.md

## Commands
- Use `npm install` with Node/npm managed by `packageManager: npm@10.9.7`.
- Dev server: `npm start` runs `ng serve --port 4300`. Do not trust the README's older `4200` note.
- Production build: `npm run build`.
- Development build/watch: `npm run watch`.
- Unit tests use Angular's `ng test` with the Vitest runner, not Karma/Jasmine.
- Full test run: `npm run test -- --watch=false`.
- Focus one spec file: `npm run test -- --watch=false --include src/app/path/to/file.spec.ts`.
- Focus by suite/test name: add `--filter "pattern"`.

## Architecture
- This is a single Angular application, not a monorepo.
- The app boots from `src/main.ts` via `bootstrapApplication(App, appConfig)` and uses standalone components/providers throughout; there are no NgModules.
- Routing is minimal: `src/app/app.routes.ts` lazy-loads only `features/recipe-explorer/pages/recipe-explorer-page.component` at `/`.
- The core feature wiring lives in `src/app/features/recipe-explorer/`:
  - `services/recipe-data.service.ts` loads the dataset from `public/data/recipes.json` via `GET data/recipes.json`.
  - `facade/recipe-explorer.facade.ts` owns filter state, derived recipe/grouping logic, selected recipe state, and query-param serialization.
  - `pages/recipe-explorer-page.component.ts` syncs facade state to URL query params and composes the panel components.
- If you change dataset shape or asset metadata, update `public/data/recipes.json`, the `models/` types, and the affected facade/utils/specs together.

## Testing Notes
- The Angular test builder defaults to `vitest` plus `jsdom` here. If you assume browser-only/Karma behavior, you'll likely write the wrong setup.
- Existing signal/effect-heavy facade tests call `TestBed.flushEffects()` after state changes. Follow that pattern when asserting computed/effect-driven updates.
- Service tests use `provideHttpClient()` plus `provideHttpClientTesting()` and expect requests to `data/recipes.json`.

## Constraints And Conventions
- TypeScript and Angular template checks are strict (`strict`, `noImplicitOverride`, `noImplicitReturns`, `strictTemplates`, etc.). Prefer fixing types cleanly instead of weakening config.
- Components default to SCSS (`angular.json`) and repo formatting is driven by Prettier: `singleQuote: true`, `printWidth: 100`, Angular HTML parser for `*.html`.
- Production build budgets are enforced: initial bundle warning/error at `500kB`/`1MB`, component style warning/error at `11kB`/`12kB`. Large style additions can fail CI/builds.
