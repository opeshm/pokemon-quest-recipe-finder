import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { App } from './app';
import { routes } from './app.routes';
import { RECIPES_REPOSITORY } from './core/data-access/recipes.repository';
import { LoadState } from './core/models/load-state.model';
import { RecipeDataset } from './core/models/recipe-dataset.model';

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
  recipes: []
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        provideLocationMocks(),
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
  });

  it('creates the app shell', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the app navigation and router outlet shell', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.textContent).toContain('Recipes');
    expect(compiled.textContent).toContain('Moves');
    expect(compiled.textContent).toContain('Pokedex');
  });

  it('keeps the recipe explorer route at the root path', async () => {
    const fixture = TestBed.createComponent(App);
    const location = TestBed.inject(Location);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(location.path()).toBe('');
  });
});
