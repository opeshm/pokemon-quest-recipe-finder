import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { RECIPES_REPOSITORY } from './core/data-access/recipes.repository';
import { ServerRecipeDataService } from './core/data-access/server-recipe-data.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: RECIPES_REPOSITORY,
      useExisting: ServerRecipeDataService
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
