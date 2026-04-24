import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadState } from '../models/load-state.model';
import { RecipeDataset } from '../models/recipe-dataset.model';

export interface RecipesRepository {
  readonly loadState$: Observable<LoadState<RecipeDataset>>;
  readonly dataset$: Observable<RecipeDataset>;
  reload(): void;
}

export const RECIPES_REPOSITORY = new InjectionToken<RecipesRepository>('RECIPES_REPOSITORY');
