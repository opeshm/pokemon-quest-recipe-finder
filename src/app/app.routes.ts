import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      seo: {
        title: 'Pokemon Quest Pokedex | Every Pokemon in PokeQuest Studio',
        description:
          'Browse every Pokemon available in Pokemon Quest with base stats, types, combat style, and recipe profile links.',
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
          'Compare Pokemon Quest moves by type, power, wait time, compatible stones, and Pokemon that can learn each move.',
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
          'Find Pokemon Quest recipes by dish, ingredient, quality, type, inventory, and Pokemon attraction rates.',
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
          'Read how PokeQuest Studio handles local app data for the Pokemon Quest recipe, Pokedex, and moves reference.',
        path: '/privacy'
      }
    },
    loadComponent: () =>
      import('./features/privacy/pages/privacy-policy-page.component').then(
        (module) => module.PrivacyPolicyPageComponent
      )
  }
];
