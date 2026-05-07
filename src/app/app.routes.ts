import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/pokedex/pages/pokedex-page.component').then(
        (module) => module.PokedexPageComponent
      )
  },
  {
    path: 'moves',
    loadComponent: () =>
      import('./features/moves/pages/moves-page.component').then(
        (module) => module.MovesPageComponent
      )
  },
  {
    path: 'recipes',
    loadComponent: () =>
      import('./features/recipe-explorer/pages/recipe-explorer-page.component').then(
        (module) => module.RecipeExplorerPageComponent
      )
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./features/privacy/pages/privacy-policy-page.component').then(
        (module) => module.PrivacyPolicyPageComponent
      )
  }
];
