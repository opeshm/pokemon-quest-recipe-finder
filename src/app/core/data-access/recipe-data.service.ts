import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, map, of, shareReplay, startWith, switchMap } from 'rxjs';
import { LoadState } from '../models/load-state.model';
import { RecipeDataset } from '../models/recipe-dataset.model';

@Injectable({ providedIn: 'root' })
export class RecipeDataService {
  private readonly http = inject(HttpClient);
  private readonly reloadTrigger$ = new BehaviorSubject<void>(undefined);

  readonly loadState$: Observable<LoadState<RecipeDataset>> = this.reloadTrigger$.pipe(
    switchMap(() =>
      this.http.get<RecipeDataset>('data/recipes.json').pipe(
        map((data) => ({ status: 'success', data }) as LoadState<RecipeDataset>),
        startWith({ status: 'loading' } as LoadState<RecipeDataset>),
        catchError(() =>
          of({
            status: 'error',
            message: 'Unable to load recipe data. Please try again.'
          } as LoadState<RecipeDataset>)
        )
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly dataset$: Observable<RecipeDataset> = this.loadState$.pipe(
    filter((state): state is Extract<LoadState<RecipeDataset>, { status: 'success' }> => state.status === 'success'),
    map((state) => state.data)
  );

  reload(): void {
    this.reloadTrigger$.next();
  }
}
