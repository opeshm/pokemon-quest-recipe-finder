# SEO Improvements Implementation Guide

This document captures the SEO audit findings for `https://pokequest.opeshm.net/` and turns them into implementation tasks. It is intentionally detailed so a future coding agent can make the changes without re-running the entire audit.

## Current Site Facts

- The app is a single Angular application with standalone components.
- Entry point: `src/main.ts` bootstraps `App` with `appConfig`.
- Routes live in `src/app/app.routes.ts`:
  - `/` renders the Pokedex page.
  - `/moves` renders the moves page.
  - `/recipes` renders the recipe finder page.
  - `/privacy` renders the privacy page.
- Static/prerender behavior lives in `src/app/app.routes.server.ts`; currently `**` is prerendered.
- SEO tags are applied by `src/app/core/seo/seo.service.ts` using route `data.seo`.
- Static public assets live in `public/`.
- Sitemap and robots files are source files at:
  - `public/sitemap.xml`
  - `public/robots.txt`
- Recipe data is fetched from `public/data/recipes.json` by `RecipeDataService` via `GET data/recipes.json`.
- Full verification commands:
  - `npm run build`
  - `npm run test -- --watch=false`

## Audit Summary

The live site is generally crawlable and has route-specific metadata, canonicals, Open Graph tags, and Twitter Card tags. Main issues to address are:

1. `/recipes` prerendered HTML currently shows `Recipe data unavailable` instead of useful recipe content.
2. Unknown URLs return `200` with the app shell, which can create soft 404s.
3. `public/data/recipes.json` is large and served with revalidation headers on the deployed site.
4. Meta descriptions are valid but short.
5. The site has no JSON-LD structured data.
6. Social preview uses SVG, which is less reliable for crawlers than PNG/JPG.
7. There are no indexable detail pages for individual Pokemon, moves, or recipes.

## Priority 1: Fix `/recipes` Prerender Content

### Problem

The live HTML for `https://pokequest.opeshm.net/recipes` contains:

```text
Recipe data unavailable
Unable to load recipe data. Please try again.
```

This means search engines and no-JS users can see the recipe finder as an error page, even if it works after client-side hydration.

### Likely Cause

`RecipeDataService` fetches `data/recipes.json` through Angular `HttpClient`. During static prerender, that request may fail or not resolve in the same way it does in the browser. The page then serializes the error state into the prerendered HTML.

### Files To Inspect

- `src/app/core/data-access/recipe-data.service.ts`
- `src/app/features/recipe-explorer/pages/recipe-explorer-page.component.ts`
- `src/app/features/recipe-explorer/facade/recipe-explorer.facade.ts`
- `src/app/app.config.server.ts`
- `src/app/app.routes.server.ts`
- `angular.json`

### Preferred Fix

Make recipe data available during prerender instead of rendering an error state.

Recommended approaches, in order:

1. Add a server-side data path that reads `public/data/recipes.json` during prerender, while keeping `HttpClient` for the browser.
2. Use Angular server providers to replace `RECIPES_REPOSITORY` with a server-safe repository during prerender.
3. If direct file reading is not practical, render a useful static fallback for `/recipes` instead of the error panel during SSG.

### Implementation Notes

- Do not weaken the browser implementation. The browser should still load `data/recipes.json` normally.
- Avoid duplicating recipe filtering logic in the server path.
- If adding a server repository, keep it behind the existing `RECIPES_REPOSITORY` injection token.
- Keep the dataset model unchanged unless absolutely necessary.
- If using Node file reads in a server-only provider, make sure it is not included in browser bundles.

### Acceptance Criteria

After `npm run build`, inspect the built or live `/recipes` HTML and confirm it no longer includes:

```text
Recipe data unavailable
Unable to load recipe data
```

The prerendered `/recipes` HTML should include useful recipe page copy and ideally visible recipe/filter content.

### Verification Commands

```bash
npm run build
npm run test -- --watch=false
```

After deployment, verify:

```bash
curl -L https://pokequest.opeshm.net/recipes | grep -i "Recipe data unavailable"
```

Expected result: no match.

## Priority 2: Return Real 404 For Unknown URLs

### Problem

The live URL `https://pokequest.opeshm.net/nonexistent-seo-test` returned `HTTP/2 200` and served `index.html`. This can create soft 404s.

### Files To Inspect

- `src/app/app.routes.ts`
- `src/app/app.routes.server.ts`
- `public/sitemap.xml`
- Hosting config files if present in future, such as `vercel.json`.

### Implementation Plan

1. Add a not-found page component, for example:
   - `src/app/features/not-found/pages/not-found-page.component.ts`
   - `src/app/features/not-found/pages/not-found-page.component.html`
   - `src/app/features/not-found/pages/not-found-page.component.scss`
2. Add a wildcard route at the end of `src/app/app.routes.ts`:

```ts
{
  path: '**',
  data: {
    seo: {
      title: 'Page Not Found | PokeQuest Studio',
      description: 'The requested PokeQuest Studio page could not be found.',
      path: '/404'
    }
  },
  loadComponent: () =>
    import('./features/not-found/pages/not-found-page.component').then(
      (module) => module.NotFoundPageComponent
    )
}
```

3. Configure server/static hosting to return a `404` status for unknown paths.
4. Keep valid SPA routes working after refresh.

### Important Warning

Adding only a client-side wildcard route is not enough. Search engines care about the HTTP status. The server or static host must return `404` for unknown URLs.

### Vercel Notes

This site appears to run on Vercel. If no `vercel.json` exists, investigate Angular/Vercel static output first. A future fix may need a `vercel.json`, but do not add one blindly if Angular output already has route metadata that Vercel can use.

### Acceptance Criteria

Valid routes return `200`:

```bash
curl -I https://pokequest.opeshm.net/
curl -I https://pokequest.opeshm.net/moves
curl -I https://pokequest.opeshm.net/recipes
curl -I https://pokequest.opeshm.net/privacy
```

Unknown routes return `404`:

```bash
curl -I https://pokequest.opeshm.net/nonexistent-seo-test
```

Expected result: `HTTP/2 404` or equivalent.

## Priority 3: Improve Meta Descriptions

### Problem

Current meta descriptions are valid but short. Observed lengths during audit:

- `/`: 111 characters
- `/moves`: 111 characters
- `/recipes`: 103 characters
- `/privacy`: 108 characters

Search snippets often perform better around 140-160 characters when the copy is useful and not stuffed.

### File To Edit

- `src/app/app.routes.ts`

### Suggested Descriptions

Use these as starting points. Adjust only if the actual page content changes.

For `/`:

```text
Browse every Pokemon in Pokemon Quest with base HP, ATK, type, combat style, evolution details, moves, and linked recipe profiles.
```

For `/moves`:

```text
Compare Pokemon Quest moves by type, power, wait time, compatible stones, and every Pokemon that can learn each move.
```

For `/recipes`:

```text
Find Pokemon Quest recipes by dish, ingredient mix, quality, type, inventory, and Pokemon attraction rates in a fast recipe finder.
```

For `/privacy`:

```text
Read how PokeQuest Studio handles local app data, recipe filters, language preferences, analytics, and third-party services.
```

### Acceptance Criteria

- Every route still has a unique description.
- Descriptions are accurate to visible page content.
- No description exceeds 160 characters unless there is a strong reason.

### Verification

After build/deploy, check rendered HTML:

```bash
curl -L https://pokequest.opeshm.net/ | grep -i 'name="description"'
curl -L https://pokequest.opeshm.net/moves | grep -i 'name="description"'
curl -L https://pokequest.opeshm.net/recipes | grep -i 'name="description"'
curl -L https://pokequest.opeshm.net/privacy | grep -i 'name="description"'
```

## Priority 4: Add JSON-LD Structured Data

### Problem

No `application/ld+json` structured data was detected.

### Best Initial Scope

Add site-level JSON-LD once, not per card.

Recommended schema types:

- `WebSite`
- `WebApplication`
- Optional: `BreadcrumbList` per route

### Files To Inspect/Edit

- `src/app/core/seo/seo.service.ts`
- `src/app/app.routes.ts`
- `src/index.html`

### Recommended Implementation

Extend `SeoService` to upsert JSON-LD script tags into `<head>`.

Add a helper that:

1. Finds an existing script by ID.
2. Creates it if missing.
3. Sets `type="application/ld+json"`.
4. Sets `textContent` to `JSON.stringify(data)`.

Example helper shape:

```ts
private upsertJsonLd(id: string, data: unknown): void {
  let script = this.document.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!script) {
    script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    this.document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}
```

Initial `WebSite` data:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PokeQuest Studio",
  "url": "https://pokequest.opeshm.net/"
}
```

Initial `WebApplication` data:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PokeQuest Studio",
  "url": "https://pokequest.opeshm.net/",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web",
  "description": "Search Pokemon Quest recipes, browse Pokemon, and compare moves."
}
```

### Acceptance Criteria

- Rendered HTML includes one `WebSite` JSON-LD block.
- Rendered HTML includes one `WebApplication` JSON-LD block.
- No duplicate JSON-LD blocks after SPA navigation.
- Build and tests pass.

### Verification

```bash
npm run build
npm run test -- --watch=false
```

After deployment:

```bash
curl -L https://pokequest.opeshm.net/ | grep -i 'application/ld+json'
```

Also validate with Google Rich Results Test or Schema Markup Validator manually.

## Priority 5: Replace SVG Social Preview With PNG/JPG

### Problem

Current social tags point to:

```text
https://pokequest.opeshm.net/assets/social-preview.svg
```

Some crawlers support SVG poorly for link previews. PNG or JPG is safer.

### Files To Inspect/Edit

- `public/assets/social-preview.svg`
- `src/app/core/seo/seo.service.ts`
- `src/index.html`

### Implementation Plan

1. Create a `1200x630` PNG or JPG preview image.
2. Save it as:

```text
public/assets/social-preview.png
```

3. Update `DEFAULT_IMAGE` in `src/app/core/seo/seo.service.ts` to point to the PNG.
4. Update the static fallback tags in `src/index.html` to point to the PNG.
5. Keep the SVG only if it is still used elsewhere.

### Acceptance Criteria

- Rendered HTML uses `.png` or `.jpg` for `og:image` and `twitter:image`.
- The image URL returns `200`.
- The image dimensions are `1200x630` or another common share-preview size.

### Verification

```bash
curl -I https://pokequest.opeshm.net/assets/social-preview.png
curl -L https://pokequest.opeshm.net/ | grep -E 'og:image|twitter:image'
```

## Priority 6: Improve Caching For `recipes.json`

### Problem

The live recipe data response is large and not long-cacheable:

```text
content-length: 1729024
cache-control: public, max-age=0, must-revalidate
```

### Files To Inspect

- `public/data/recipes.json`
- `angular.json`
- Hosting config such as `vercel.json`, if one exists or is added.

### Implementation Options

Option A: Add Vercel headers for the current path.

```json
{
  "headers": [
    {
      "source": "/data/recipes.json",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, stale-while-revalidate=86400"
        }
      ]
    }
  ]
}
```

Option B: Version the dataset path.

1. Rename/copy the dataset to a versioned file, for example `recipes.2026-05-13.json`.
2. Update `RecipeDataService` to request the versioned path.
3. Configure immutable caching for versioned files.

Option C: Split data by feature or route.

This is more complex and should only be done if performance data shows the JSON payload is a major bottleneck.

### Recommendation

Start with Option A. It is minimal and reversible. Use a moderate cache duration unless there is a deployment process that guarantees cache busting.

### Acceptance Criteria

After deployment:

```bash
curl -I https://pokequest.opeshm.net/data/recipes.json
```

Expected `cache-control` should no longer be `max-age=0, must-revalidate` if a caching fix was applied.

## Priority 7: Consider Indexable Detail Pages

### Problem

The app has rich data for Pokemon, moves, and recipes, but detail views appear to be modal or client state rather than stable, indexable URLs.

### SEO Opportunity

Create dedicated pages for high-intent long-tail searches:

- `/pokedex/bulbasaur`
- `/moves/hydro-pump`
- `/recipes/mulligan-stew-a-la-cube`

### Files To Inspect

- `src/app/features/pokedex/data/pokedex.data.ts`
- `src/app/features/moves/data/moves.data.ts`
- `public/data/recipes.json`
- `src/app/shared/pokemon-profile/`
- `src/app/app.routes.ts`
- `public/sitemap.xml`

### Implementation Plan

1. Add slug helpers for Pokemon names, move names, and dish names.
2. Add routed pages for detail views.
3. Reuse existing modal/profile logic where practical, but avoid mounting a modal as the page itself if it harms semantics.
4. Add route-specific SEO metadata for each detail page.
5. Generate sitemap entries for detail URLs.
6. Add internal links from cards/lists to detail pages.

### Important Constraint

This is a larger feature and should not be mixed with small metadata fixes. Implement it in a separate branch/PR.

### Acceptance Criteria

- Detail pages load directly on refresh.
- Detail pages return `200` and have one clear `<h1>`.
- Detail pages have unique titles, descriptions, and canonicals.
- Sitemap includes detail pages.
- Existing modal interactions still work, or are intentionally replaced.

## Priority 8: Add About/Data Methodology Page

### Problem

The site gives limited E-E-A-T/context signals. It says data was extracted and normalized, but there is no dedicated explanation page.

### Suggested Page

Add `/about` or `/data-methodology`.

### Suggested Content

- What PokeQuest Studio is.
- What Pokemon Quest data is included.
- Data source attribution.
- How recipe data was normalized.
- When the data was last updated.
- How users can report mistakes.
- Disclaimer that this is a fan-made reference app.

### Files To Edit

- `src/app/app.routes.ts`
- `src/app/app.html` if adding navigation/footer link.
- `public/sitemap.xml`
- `src/app/core/i18n/translations.ts` if the page needs translated labels.

### Acceptance Criteria

- New page is linked from footer or nav.
- New page has unique title, description, canonical, and one `<h1>`.
- Sitemap includes the new page.

## Verification Checklist For Any SEO Change

Run before committing:

```bash
npm run build
npm run test -- --watch=false
```

Check key rendered metadata locally or after deploy:

```bash
curl -L https://pokequest.opeshm.net/ | grep -E '<title>|description|canonical|og:title|twitter:title'
curl -L https://pokequest.opeshm.net/moves | grep -E '<title>|description|canonical|og:title|twitter:title'
curl -L https://pokequest.opeshm.net/recipes | grep -E '<title>|description|canonical|og:title|twitter:title'
curl -L https://pokequest.opeshm.net/privacy | grep -E '<title>|description|canonical|og:title|twitter:title'
```

Check robots and sitemap:

```bash
curl -L https://pokequest.opeshm.net/robots.txt
curl -L https://pokequest.opeshm.net/sitemap.xml
```

Check status codes:

```bash
curl -I https://pokequest.opeshm.net/
curl -I https://pokequest.opeshm.net/moves
curl -I https://pokequest.opeshm.net/recipes
curl -I https://pokequest.opeshm.net/privacy
curl -I https://pokequest.opeshm.net/nonexistent-seo-test
```

Manual checks after deployment:

- Google Search Console sitemap submission.
- Google Rich Results Test for JSON-LD.
- PageSpeed Insights for mobile and desktop.
- Social preview debugger for Open Graph image.

## Do Not Do

- Do not remove prerendering just to hide the `/recipes` issue.
- Do not add generic keyword stuffing to titles or descriptions.
- Do not index search/filter query URLs.
- Do not add `hreflang` unless there are real localized routes. The current language switch changes UI text but does not create separate language URLs.
- Do not add noindex to important pages to avoid fixing content issues.
