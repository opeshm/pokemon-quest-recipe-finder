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
    path: 'pokedex',
    loadComponent: () =>
      import('./features/pokedex/pages/pokedex-page.component').then(
        (module) => module.PokedexPageComponent
      )
  }
];
