# Testing Reference

- This repo uses Angular's `@angular/build:unit-test` builder with Vitest and jsdom. Do not assume Karma, Jasmine globals, or browser-only test helpers.
- Full verification is `npm run build` and `npm run test -- --watch=false`.
- There is no separate lint or standalone typecheck script; `npm run build` is the strict TypeScript and Angular template validation step.
- To run one spec file, use `npm run test -- --watch=false --include src/app/path/to/file.spec.ts`.
- To focus by suite or test name, add `--filter "pattern"` to the test command.
- Signal/effect-heavy tests already rely on `TestBed.flushEffects()` after state changes. Follow that pattern when asserting computed state from `RecipeExplorerFacade` or other signal-driven code.
- HTTP service tests use `provideHttpClient()` with `provideHttpClientTesting()` and should expect requests to `data/recipes.json`.
- The app shell and routed feature tests stub `RecipeDataService` rather than hitting the real dataset. Keep that pattern for component tests that only need stable sprite or recipe fixtures.
