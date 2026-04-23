import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { LoadState } from '../models/load-state.model';
import { RecipeDataset } from '../models/recipe.model';
import { RecipeDataService } from '../services/recipe-data.service';
import { RecipeExplorerFacade } from './recipe-explorer.facade';

const mockDataset = {
  metadata: {
    title: 'Pokemon Quest Recipe Finder Dataset',
    source: 'https://pokequestrecipes.me',
    generatedAt: '2026-03-30T00:00:00.000Z',
    totalRecipes: 2,
    totalDishes: 1,
    totalPokemon: 2,
    scannedPages: 1,
    rateLimitMs: 250
  },
  ingredients: [
    { code: 'bm', name: 'Balm Mushroom' },
    { code: 'br', name: 'Big Root' }
  ],
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
  pokemonIndex: [
    { id: 1, name: 'Bulbasaur', spriteCol: 0, spriteRow: 0 },
    { id: 4, name: 'Charmander', spriteCol: 3, spriteRow: 0 }
  ],
  dishIndex: [
    {
      slug: 'mulligan-stew-a-la-cube',
      dishName: 'Mulligan Stew a la Cube',
      typeName: 'Misc',
      spriteCol: 0,
      spriteRow: 0
    }
  ],
  recipes: [
    {
      id: 'mulligan-stew-a-la-cube-special-001',
      recipeName: 'Mulligan Stew a la Cube',
      dishName: 'Mulligan Stew a la Cube',
      dishSlug: 'mulligan-stew-a-la-cube',
      typeName: 'Misc',
      quality: 'Special',
      qualityTier: 4,
      ingredients: [
        { code: 'bm', name: 'Balm Mushroom', quantity: 4 },
        { code: 'br', name: 'Big Root', quantity: 1 }
      ],
      ingredientPattern: ['bm', 'bm', 'bm', 'bm', 'br'],
      pokemonResults: [
        { name: 'Bulbasaur', attractRate: 66.66 },
        { name: 'Charmander', attractRate: 33.34 }
      ],
      source: {
        page: 'https://pokequestrecipes.me/types/mulligan-stew-a-la-cube/',
        extractionType: 'next-data-script'
      }
    },
    {
      id: 'mulligan-stew-a-la-cube-special-002',
      recipeName: 'Mulligan Stew a la Cube',
      dishName: 'Mulligan Stew a la Cube',
      dishSlug: 'mulligan-stew-a-la-cube',
      typeName: 'Misc',
      quality: 'Special',
      qualityTier: 4,
      ingredients: [
        { code: 'bm', name: 'Balm Mushroom', quantity: 3 },
        { code: 'br', name: 'Big Root', quantity: 2 }
      ],
      ingredientPattern: ['bm', 'bm', 'bm', 'br', 'br'],
      pokemonResults: [
        { name: 'Bulbasaur', attractRate: 66.66 },
        { name: 'Charmander', attractRate: 33.34 }
      ],
      source: {
        page: 'https://pokequestrecipes.me/types/mulligan-stew-a-la-cube/',
        extractionType: 'next-data-script'
      }
    }
  ]
};

describe('RecipeExplorerFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeExplorerFacade,
        {
          provide: RecipeDataService,
          useValue: {
            dataset$: of(mockDataset),
            loadState$: of({ status: 'success', data: mockDataset } as LoadState<RecipeDataset>),
            reload: vi.fn()
          }
        }
      ]
    });
  });

  it('exposes grouped recipes and normalizes the selected recipe id', () => {
    const facade = TestBed.inject(RecipeExplorerFacade);
    TestBed.flushEffects();

    expect(facade.groupedRecipes()).toHaveLength(1);
    expect(facade.selectedRecipeId()).toBe(facade.filteredRecipes()[0].id);
  });

  it('updates filters and recipe selection through facade actions', () => {
    const facade = TestBed.inject(RecipeExplorerFacade);
    TestBed.flushEffects();

    facade.setSearchTerm('bulba');
    expect(facade.searchTerm()).toBe('bulba');

    facade.toggleType('Misc');
    expect(facade.selectedTypes()).toEqual(['Misc']);

    facade.togglePokemon('Bulbasaur');
    expect(facade.selectedPokemon()).toEqual(['Bulbasaur']);

    facade.selectRecipe('mulligan-stew-a-la-cube|Special|Bulbasaur:66.66|Charmander:33.34');
    TestBed.flushEffects();
    expect(facade.selectedRecipeId()).toContain('mulligan-stew-a-la-cube');
  });

  it('toggles inventory ingredients and clears filters', () => {
    const facade = TestBed.inject(RecipeExplorerFacade);
    TestBed.flushEffects();

    facade.toggleInventoryIngredient('bm');
    expect(facade.inventoryIngredients()).toEqual(['bm']);
    expect(facade.hasInventoryFilter()).toBe(true);

    facade.toggleInventoryIngredient('bm');
    expect(facade.inventoryIngredients()).toEqual([]);

    facade.setSearchTerm('recipe');
    facade.setSelectedQualities(['Special']);
    facade.setSelectedPokemon(['Bulbasaur']);
    facade.setSelectedTypes(['Misc']);
    facade.setInventoryIngredients(['bm']);

    facade.clearFilters();

    expect(facade.filters()).toEqual({
      searchTerm: '',
      selectedQualities: [],
      selectedPokemon: [],
      selectedTypes: [],
      inventoryIngredients: []
    });
  });

  it('hydrates from query params and rebuilds query params from current state', () => {
    const facade = TestBed.inject(RecipeExplorerFacade);
    TestBed.flushEffects();

    facade.hydrateFromQueryParams({
      search: 'bulba',
      quality: 'Special',
      pokemon: 'Bulbasaur',
      type: 'Misc',
      inventory: 'bm,br',
      recipe: 'mulligan-stew-a-la-cube|Special|Bulbasaur:66.66|Charmander:33.34'
    });
    TestBed.flushEffects();

    expect(facade.searchTerm()).toBe('bulba');
    expect(facade.selectedQualities()).toEqual(['Special']);
    expect(facade.selectedPokemon()).toEqual(['Bulbasaur']);
    expect(facade.selectedTypes()).toEqual(['Misc']);
    expect(facade.inventoryIngredients()).toEqual(['bm', 'br']);
    expect(facade.buildQueryParams()).toEqual({
      search: 'bulba',
      quality: 'Special',
      pokemon: 'Bulbasaur',
      type: 'Misc',
      inventory: 'bm,br',
      recipe: 'mulligan-stew-a-la-cube|Special|Bulbasaur:66.66|Charmander:33.34'
    });
  });

  it('omits empty values when building query params', () => {
    const facade = TestBed.inject(RecipeExplorerFacade);
    TestBed.flushEffects();

    expect(facade.buildQueryParams()).toEqual({
      search: null,
      quality: null,
      pokemon: null,
      type: null,
      inventory: null,
      recipe: facade.selectedRecipeId()
    });
  });

  it('exposes loading and error state and retries through the data service', () => {
    const loadState$ = new BehaviorSubject<LoadState<RecipeDataset>>({ status: 'loading' });
    const reload = vi.fn();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        RecipeExplorerFacade,
        {
          provide: RecipeDataService,
          useValue: {
            dataset$: of(mockDataset),
            loadState$,
            reload
          }
        }
      ]
    });

    const facade = TestBed.inject(RecipeExplorerFacade);
    TestBed.flushEffects();

    expect(facade.isLoading()).toBe(true);
    expect(facade.loadError()).toBeNull();

    loadState$.next({ status: 'error', message: 'Unable to load recipe data. Please try again.' });
    TestBed.flushEffects();

    expect(facade.isLoading()).toBe(false);
    expect(facade.loadError()).toBe('Unable to load recipe data. Please try again.');

    facade.retryLoad();
    expect(reload).toHaveBeenCalled();
  });
});
