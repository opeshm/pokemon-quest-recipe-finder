# AGENTS.md

## Commands
- Use `npm install`; the repo pins npm via `packageManager: npm@10.9.7`.
- Dev server: `npm start` runs `ng serve --port 4300`. Do not trust the README's older `4200` note.
- Production build: `npm run build`.
- Development build/watch: `npm run watch`.
- Full test run: `npm run test -- --watch=false`.
- Focus one spec file: `npm run test -- --watch=false --include src/app/path/to/file.spec.ts`.
- Focus by suite/test name: add `--filter "pattern"`.
- There is no separate lint or typecheck script; use `npm run build` for strict TS/template validation.

## Architecture
- This is a single Angular application, not a monorepo.
- The app boots from `src/main.ts` via `bootstrapApplication(App, appConfig)`. Root component/config files are `src/app/app.ts` and `src/app/app.config.ts`, not the usual `app.component.ts` layout.
- `src/app/app.routes.ts` is the route source of truth: pokedex is `/`, moves is `/moves`, recipes is `/recipes`, and privacy is `/privacy`.
- The app is fully standalone; do not add NgModules.
- Angular build uses `outputMode: "static"`; server routes in `src/app/app.routes.server.ts` prerender `**`.
- Fetched recipe content comes from `public/data/recipes.json`; `RecipeDataService` loads `GET data/recipes.json` and `appConfig` exposes it through `RECIPES_REPOSITORY`.
- `src/app/features/recipe-explorer/facade/recipe-explorer.facade.ts` owns filter state, derived recipe/grouping logic, selected recipe state, and query-param serialization.
- `moves/` and `pokedex/` mostly render static TS datasets (`data/*.data.ts`) but still depend on recipe data plus `src/app/core/assets/recipe-asset.service.ts` for sprite metadata and image lookup.
- `src/app/shared/pokemon-profile/` is a cross-feature modal mounted in the app shell; it combines static pokedex/move data with fetched recipe data.
- If you change Pokemon names, sprite metadata, or recipe dataset shape, reconcile `public/data/recipes.json`, `src/app/core/models/`, facade/utils, affected static `moves`/`pokedex` data, and related specs together.
- Translations are a static in-repo map in `src/app/core/i18n/translations.ts`; the language service only supports `en` and `es` and stores `pokuest-language` in `localStorage`.

## Testing Notes
- The Angular test builder defaults to `vitest` plus `jsdom` here. If you assume browser-only/Karma behavior, you'll likely write the wrong setup.
- Existing signal/effect-heavy facade tests call `TestBed.flushEffects()` after state changes. Follow that pattern when asserting computed/effect-driven updates.
- Service tests use `provideHttpClient()` plus `provideHttpClientTesting()` and expect requests to `data/recipes.json`.
- Component and app-shell tests usually stub `RECIPES_REPOSITORY` instead of hitting the real recipe dataset.
- `src/app/core/data-integrity.spec.ts` verifies recipe JSON, static moves/pokedex data, and asset files stay aligned; update/run it when touching names, types, moves, sprites, or dataset shape.

## Constraints And Conventions
- TypeScript and Angular template checks are strict (`strict`, `noImplicitOverride`, `noImplicitReturns`, `strictTemplates`, etc.). Prefer fixing types cleanly instead of weakening config.
- Components default to SCSS (`angular.json`) and repo formatting is driven by Prettier: `singleQuote: true`, `printWidth: 100`, Angular HTML parser for `*.html`.
- Production build budgets are enforced: initial bundle warning/error at `500kB`/`1MB`, component style warning/error at `11kB`/`12kB`. Large style additions can fail CI/builds.
- `dist/` and `.angular/` are generated/cache outputs; do not treat them as source when investigating behavior.

## OpenCode
- Project-level OpenCode config lives in `opencode.json` and also loads `docs/ai/architecture.md` and `docs/ai/testing.md`; those docs may lag source, so trust routes/scripts/config first.
- Use `.opencode/agents/repo-docs.md` when the task is specifically about maintaining repo docs or agent reference files.
