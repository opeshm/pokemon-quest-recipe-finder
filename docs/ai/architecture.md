# Architecture Reference

- Entry point: `src/main.ts` bootstraps `App` with `appConfig`; root shell files are `src/app/app.ts`, `src/app/app.html`, and `src/app/app.config.ts`.
- Routing lives in `src/app/app.routes.ts` and lazy-loads exactly three standalone pages: recipe explorer at `/`, moves at `/moves`, and pokedex at `/pokedex`.
- `src/app/features/recipe-explorer/` contains the only fetched domain data. `RecipeDataService` loads `GET data/recipes.json`, and `RecipeExplorerFacade` is the state hub for filters, recipe grouping, selection, and URL query-param serialization.
- `recipe-explorer/pages/recipe-explorer-page.component.ts` is the wiring layer for that feature: it composes panel components, hydrates facade state from query params, and writes facade state back to the URL.
- `src/app/features/moves/` and `src/app/features/pokedex/` are mostly static views backed by `data/*.data.ts`, but both still depend on `RecipeDataService` and `RecipeAssetService` for sprite metadata and asset lookup.
- `src/app/shared/pokemon-profile/` is mounted in the root app shell, not inside a feature route. The modal merges static pokedex/moves data with fetched recipe data, so changes to Pokemon naming or dataset shape can break multiple screens at once.
- Shared sprite and icon path logic lives in `recipe-explorer/services/recipe-asset.service.ts`. If assets or metadata move, update all consumers instead of duplicating path logic in feature pages.
- Source of truth for fetched content is `public/data/recipes.json`. If you change its shape or Pokemon naming, reconcile `recipe-explorer/models/`, facade/utils, `shared/pokemon-profile/`, and any affected static `moves` or `pokedex` data together.
