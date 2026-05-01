# AGENTS.md

## Commands
- Use `npm install`; the repo pins npm via `packageManager: npm@10.9.7`.
- Dev server: `npm start` runs `ng serve --port 4300`. Do not trust the README's older `4200` note.
- Production build: `npm run build`.
- Development build/watch: `npm run watch`.
- Unit tests use Angular's `ng test` with the Vitest runner, not Karma/Jasmine.
- Full test run: `npm run test -- --watch=false`.
- Focus one spec file: `npm run test -- --watch=false --include src/app/path/to/file.spec.ts`.
- Focus by suite/test name: add `--filter "pattern"`.
- There is no separate lint or typecheck script; use `npm run build` for strict TS/template validation.

## Architecture
- This is a single Angular application, not a monorepo.
- The app boots from `src/main.ts` via `bootstrapApplication(App, appConfig)`. Root component/config files are `src/app/app.ts` and `src/app/app.config.ts`, not the usual `app.component.ts` layout.
- `src/app/app.routes.ts` lazy-loads four pages: recipe explorer at `/`, moves at `/moves`, pokedex at `/pokedex`, and privacy at `/privacy`.
- The app is fully standalone; do not add NgModules.
- Fetched recipe content comes from `public/data/recipes.json`; `src/app/core/data-access/recipe-data.service.ts` loads it via `GET data/recipes.json` and is exposed through `RECIPES_REPOSITORY`.
- `src/app/features/recipe-explorer/facade/recipe-explorer.facade.ts` owns filter state, derived recipe/grouping logic, selected recipe state, and query-param serialization.
- `moves/` and `pokedex/` mostly render static TS datasets (`data/*.data.ts`) but still depend on recipe data plus `src/app/core/assets/recipe-asset.service.ts` for sprite metadata and image lookup.
- `src/app/shared/pokemon-profile/` is a cross-feature modal mounted in the app shell; it combines static pokedex/move data with fetched recipe data.
- If you change Pokemon names, sprite metadata, or recipe dataset shape, reconcile `public/data/recipes.json`, `src/app/core/models/`, facade/utils, affected static `moves`/`pokedex` data, and related specs together.

## Testing Notes
- The Angular test builder defaults to `vitest` plus `jsdom` here. If you assume browser-only/Karma behavior, you'll likely write the wrong setup.
- Existing signal/effect-heavy facade tests call `TestBed.flushEffects()` after state changes. Follow that pattern when asserting computed/effect-driven updates.
- Service tests use `provideHttpClient()` plus `provideHttpClientTesting()` and expect requests to `data/recipes.json`.
- `src/app/core/data-integrity.spec.ts` verifies recipe JSON, static moves/pokedex data, and asset files stay aligned; update/run it when touching names, types, moves, sprites, or dataset shape.

## Constraints And Conventions
- TypeScript and Angular template checks are strict (`strict`, `noImplicitOverride`, `noImplicitReturns`, `strictTemplates`, etc.). Prefer fixing types cleanly instead of weakening config.
- Components default to SCSS (`angular.json`) and repo formatting is driven by Prettier: `singleQuote: true`, `printWidth: 100`, Angular HTML parser for `*.html`.
- Production build budgets are enforced: initial bundle warning/error at `500kB`/`1MB`, component style warning/error at `11kB`/`12kB`. Large style additions can fail CI/builds.

## OpenCode
- Project-level OpenCode config lives in `opencode.json` and also loads `docs/ai/architecture.md` and `docs/ai/testing.md`; keep this file to gotchas and avoid duplicating those references.
- Use `.opencode/agents/repo-docs.md` when the task is specifically about maintaining repo docs or agent reference files.
