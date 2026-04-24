import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { RecipeDataService } from '../../../core/data-access/recipe-data.service';
import { RecipeDataset } from '../../../core/models/recipe-dataset.model';

const mockDataset: RecipeDataset = {
  metadata: {
    title: 'Pokemon Quest Recipe Finder Dataset',
    source: 'https://pokequestrecipes.me',
    generatedAt: '2026-03-30T07:54:21.531Z',
    totalRecipes: 1,
    totalDishes: 1,
    totalPokemon: 1,
    scannedPages: 1,
    rateLimitMs: 250
  },
  sprites: {
    file: 'assets/pokemon-assets.png',
    columns: 10,
    cellSizePx: 260,
    iconSizePx: 256,
    borderPx: 4
  },
  dishSprites: {
    file: 'assets/recipes-assets.png',
    columns: 4,
    rows: 5,
    cellWidthPx: 203,
    cellHeightPx: 130,
    iconWidthPx: 199,
    iconHeightPx: 126,
    borderPx: 4
  },
  ingredients: [{ code: 'bm', name: 'Balm Mushroom' }],
  pokemonIndex: [{ id: 1, name: 'Bulbasaur', spriteCol: 0, spriteRow: 0 }],
  dishIndex: [
    {
      slug: 'mulligan-stew-a-la-cube',
      dishName: 'Mulligan Stew a la Cube',
      typeName: 'Mulligan',
      spriteCol: 0,
      spriteRow: 0
    }
  ],
  recipes: [
    {
      id: 'mulligan-stew-a-la-cube-special-bulbasaur',
      recipeName: 'Mulligan Stew a la Cube (Special)',
      dishName: 'Mulligan Stew a la Cube',
      dishSlug: 'mulligan-stew-a-la-cube',
      typeName: 'Mulligan',
      quality: 'Special',
      qualityTier: 4,
      ingredients: [{ code: 'bm', name: 'Balm Mushroom', quantity: 5 }],
      ingredientPattern: ['bm', 'bm', 'bm', 'bm', 'bm'],
      pokemonResults: [{ name: 'Bulbasaur', attractRate: 100 }],
      source: {
        page: 'https://pokequestrecipes.me/mulligan-stew-a-la-cube',
        extractionType: 'test'
      }
    }
  ]
};

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
    const datasets: RecipeDataset[] = [];

    service.loadState$.subscribe((state) => states.push(state.status));
    service.dataset$.subscribe((dataset) => datasets.push(dataset));

    httpMock.expectOne('data/recipes.json').flush(mockDataset);

    expect(states).toEqual(['loading', 'success']);
    expect(datasets).toEqual([mockDataset]);
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

    httpMock.expectOne('data/recipes.json').flush(mockDataset);

    expect(states).toEqual(['loading', 'error', 'loading', 'success']);
  });
});
