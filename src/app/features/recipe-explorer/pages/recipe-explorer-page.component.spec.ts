import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { RECIPES_REPOSITORY } from '../../../core/data-access/recipes.repository';
import { LoadState } from '../../../core/models/load-state.model';
import { RecipeDataset } from '../../../core/models/recipe-dataset.model';
import { RecipeExplorerFacade } from '../facade/recipe-explorer.facade';
import { PokemonProfileService } from '../../../shared/pokemon-profile/pokemon-profile.service';
import { RecipeExplorerPageComponent } from './recipe-explorer-page.component';

const mockDataset = {
  metadata: {
    title: 'Pokemon Quest Recipe Finder Dataset',
    source: 'https://pokequestrecipes.me',
    generatedAt: '2026-03-30T00:00:00.000Z',
    totalRecipes: 1,
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

function createActivatedRouteMock(initialQueryParams: Record<string, string> = {}) {
  const queryParamMap$ = new BehaviorSubject(convertToParamMap(initialQueryParams));

  return {
    queryParamMap: queryParamMap$.asObservable(),
    snapshot: {
      queryParamMap: convertToParamMap(initialQueryParams),
      queryParams: initialQueryParams
    },
    setQueryParams(nextQueryParams: Record<string, string>) {
      this.snapshot = {
        queryParamMap: convertToParamMap(nextQueryParams),
        queryParams: nextQueryParams
      };
      queryParamMap$.next(convertToParamMap(nextQueryParams));
    }
  };
}

describe('RecipeExplorerPageComponent', () => {
  it('renders the recipe explorer heading and list', async () => {
    const activatedRouteMock = createActivatedRouteMock();
    const routerMock = {
      navigate: vi.fn().mockResolvedValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [RecipeExplorerPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: RECIPES_REPOSITORY,
          useValue: {
            dataset$: of(mockDataset),
            loadState$: of({ status: 'success', data: mockDataset } as LoadState<RecipeDataset>),
            reload: vi.fn()
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeExplorerPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Discover every recipe');
    expect(compiled.querySelector('.recipe-list li strong')?.textContent).toContain('Mulligan Stew a la Cube');
  });

  it('opens the Pokemon profile modal from recipe results', async () => {
    const activatedRouteMock = createActivatedRouteMock();
    const routerMock = {
      navigate: vi.fn().mockResolvedValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [RecipeExplorerPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: RECIPES_REPOSITORY,
          useValue: {
            dataset$: of(mockDataset),
            loadState$: of({ status: 'success', data: mockDataset } as LoadState<RecipeDataset>),
            reload: vi.fn()
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeExplorerPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('.recipe-list .pokemon-icon.mini') as HTMLElement).click();
    fixture.detectChanges();

    const pokemonProfileService = TestBed.inject(PokemonProfileService);

    expect(pokemonProfileService.selectedPokemonName()).toBe('Bulbasaur');
    expect(pokemonProfileService.selectedProfile()?.entry.name).toBe('Bulbasaur');
  });

  it('hydrates state from query params', async () => {
    const activatedRouteMock = createActivatedRouteMock({
      search: 'bulba',
      quality: 'Special',
      pokemon: 'Bulbasaur',
      type: 'Misc',
      inventory: 'bm,br'
    });
    const routerMock = {
      navigate: vi.fn().mockResolvedValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [RecipeExplorerPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: RECIPES_REPOSITORY,
          useValue: {
            dataset$: of(mockDataset),
            loadState$: of({ status: 'success', data: mockDataset } as LoadState<RecipeDataset>),
            reload: vi.fn()
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeExplorerPageComponent);
    await fixture.whenStable();
    TestBed.flushEffects();

    const facade = TestBed.inject(RecipeExplorerFacade);
    expect(facade.searchTerm()).toBe('bulba');
    expect(facade.selectedQualities()).toEqual(['Special']);
    expect(facade.selectedPokemon()).toEqual(['Bulbasaur']);
    expect(facade.selectedTypes()).toEqual(['Misc']);
    expect(facade.inventoryIngredients()).toEqual(['bm', 'br']);
  });

  it('renders error state and retries loading', async () => {
    const activatedRouteMock = createActivatedRouteMock();
    const loadState$ = new BehaviorSubject<LoadState<RecipeDataset>>({
      status: 'error',
      message: 'Unable to load recipe data. Please try again.'
    });
    const reload = vi.fn();
    const routerMock = {
      navigate: vi.fn().mockResolvedValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [RecipeExplorerPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: RECIPES_REPOSITORY,
          useValue: {
            dataset$: of(mockDataset),
            loadState$,
            reload
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeExplorerPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Recipe data unavailable');

    (compiled.querySelector('.retry-button') as HTMLButtonElement).click();
    expect(reload).toHaveBeenCalled();
  });
});
