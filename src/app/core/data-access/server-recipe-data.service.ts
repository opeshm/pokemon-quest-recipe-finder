import { Injectable } from '@angular/core';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Observable, of } from 'rxjs';
import { LoadState } from '../models/load-state.model';
import { RecipeDataset } from '../models/recipe-dataset.model';
import { RecipesRepository } from './recipes.repository';

@Injectable({ providedIn: 'root' })
export class ServerRecipeDataService implements RecipesRepository {
  private readonly dataset = this.readDataset();

  readonly loadState$: Observable<LoadState<RecipeDataset>> = of({
    status: 'success',
    data: this.dataset
  });

  readonly dataset$: Observable<RecipeDataset> = of(this.dataset);

  reload(): void {}

  private readDataset(): RecipeDataset {
    const datasetPath = join(process.cwd(), 'public', 'data', 'recipes.json');
    return JSON.parse(readFileSync(datasetPath, 'utf8')) as RecipeDataset;
  }
}
