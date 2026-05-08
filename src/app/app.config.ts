import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { RecipeDataService } from './core/data-access/recipe-data.service';
import { RECIPES_REPOSITORY } from './core/data-access/recipes.repository';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: RECIPES_REPOSITORY,
      useExisting: RecipeDataService
    }
  ]
};
