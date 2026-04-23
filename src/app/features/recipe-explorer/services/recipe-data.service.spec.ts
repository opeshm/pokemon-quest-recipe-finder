import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { RecipeDataService } from '../../../core/data-access/recipe-data.service';

describe('RecipeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeDataService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('emits loading then success state', () => {
    const service = TestBed.inject(RecipeDataService);
    const httpMock = TestBed.inject(HttpTestingController);
    const states: string[] = [];

    service.loadState$.subscribe((state) => states.push(state.status));

    httpMock.expectOne('data/recipes.json').flush({ recipes: [] });

    expect(states).toEqual(['loading', 'success']);
  });

  it('emits loading then error state and supports reload', () => {
    const service = TestBed.inject(RecipeDataService);
    const httpMock = TestBed.inject(HttpTestingController);
    const states: string[] = [];

    service.loadState$.subscribe((state) => states.push(state.status));

    httpMock.expectOne('data/recipes.json').flush('boom', {
      status: 500,
      statusText: 'Server Error'
    });

    service.reload();

    httpMock.expectOne('data/recipes.json').flush({ recipes: [] });

    expect(states).toEqual(['loading', 'error', 'loading', 'success']);
  });
});
