import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/recipe-explorer/pages/recipe-explorer-page.component').then(
        (module) => module.RecipeExplorerPageComponent
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
    path: 'pokedex',
    loadComponent: () =>
      import('./features/pokedex/pages/pokedex-page.component').then(
        (module) => module.PokedexPageComponent
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
