import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      seo: {
        title: 'Pokemon Quest Pokedex | Every Pokemon in PokeQuest Studio',
        description:
          'Browse every Pokemon in Pokemon Quest with base HP, ATK, type, combat style, evolution details, moves, and linked recipe profiles.',
        path: '/'
      }
    },
    loadComponent: () =>
      import('./features/pokedex/pages/pokedex-page.component').then(
        (module) => module.PokedexPageComponent
      )
  },
  {
    path: 'moves',
    data: {
      seo: {
        title: 'Pokemon Quest Moves | Power, Wait Time, Stones, and Pokemon',
        description:
          'Compare Pokemon Quest moves by type, power, wait time, compatible stones, and every Pokemon that can learn each move.',
        path: '/moves'
      }
    },
    loadComponent: () =>
      import('./features/moves/pages/moves-page.component').then(
        (module) => module.MovesPageComponent
      )
  },
  {
    path: 'recipes',
    data: {
      seo: {
        title: 'Pokemon Quest Recipe Finder | Ingredients and Attraction Rates',
        description:
          'Find Pokemon Quest recipes by dish, ingredient mix, quality, type, inventory, and Pokemon attraction rates in a fast recipe finder.',
        path: '/recipes'
      }
    },
    loadComponent: () =>
      import('./features/recipe-explorer/pages/recipe-explorer-page.component').then(
        (module) => module.RecipeExplorerPageComponent
      )
  },
  {
    path: 'privacy',
    data: {
      seo: {
        title: 'Privacy Policy | PokeQuest Studio',
        description:
          'Read how PokeQuest Studio handles local app data, recipe filters, language preferences, analytics, and third-party services.',
        path: '/privacy'
      }
    },
    loadComponent: () =>
      import('./features/privacy/pages/privacy-policy-page.component').then(
        (module) => module.PrivacyPolicyPageComponent
      )
  },
  {
    path: '404',
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
  },
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
];
