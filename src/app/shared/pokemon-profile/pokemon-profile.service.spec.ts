import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RECIPES_REPOSITORY } from '../../core/data-access/recipes.repository';
import { PokemonProfileService } from './pokemon-profile.service';

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
  ingredients: [],
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
  pokemonIndex: [],
  dishIndex: [],
  recipes: [
    {
      id: 'recipe-1',
      recipeName: 'Mulligan Stew a la Cube',
      dishName: 'Mulligan Stew a la Cube',
      dishSlug: 'mulligan-stew-a-la-cube',
      typeName: 'Misc',
      quality: 'Special',
      qualityTier: 4,
      ingredients: [],
      ingredientPattern: [],
      pokemonResults: [{ name: 'Bulbasaur', attractRate: 66.66 }],
      source: { page: 'https://example.com', extractionType: 'test' }
    }
  ]
};

describe('PokemonProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RECIPES_REPOSITORY,
          useValue: {
            dataset$: of(mockDataset),
            loadState$: of({ status: 'success', data: mockDataset }),
            reload: vi.fn()
          }
        }
      ]
    });
  });

  it('builds a profile with evolution chain, moves, and recipes', () => {
    const service = TestBed.inject(PokemonProfileService);

    service.open('Bulbasaur');

    const profile = service.selectedProfile();

    expect(profile?.entry.name).toBe('Bulbasaur');
    expect(profile?.evolutionChain.map((step) => step.pokemon.name)).toEqual([
      'Bulbasaur',
      'Ivysaur',
      'Venusaur'
    ]);
    expect(profile?.moves.some((move) => move.name === 'Vine Whip')).toBe(true);
    expect(profile?.moves.find((move) => move.name === 'Vine Whip')?.iconPath).toContain(
      'assets/moves/vinewhip.png'
    );
    expect(profile?.recipes.map((recipe) => recipe.recipeName)).toEqual(['Mulligan Stew a la Cube']);
  });

  it('deduplicates repeated recipe names and keeps the highest attract rate', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RECIPES_REPOSITORY,
          useValue: {
            dataset$: of({
              ...mockDataset,
              recipes: [
                {
                  id: 'recipe-1',
                  recipeName: 'Mulligan Stew a la Cube',
                  dishName: 'Mulligan Stew a la Cube',
                  dishSlug: 'mulligan-stew-a-la-cube',
                  typeName: 'Misc',
                  quality: 'Good',
                  qualityTier: 2,
                  ingredients: [],
                  ingredientPattern: [],
                  pokemonResults: [{ name: 'Bulbasaur', attractRate: 33.33 }],
                  source: { page: 'https://example.com/1', extractionType: 'test' }
                },
                {
                  id: 'recipe-2',
                  recipeName: 'Mulligan Stew a la Cube',
                  dishName: 'Mulligan Stew a la Cube',
                  dishSlug: 'mulligan-stew-a-la-cube',
                  typeName: 'Misc',
                  quality: 'Special',
                  qualityTier: 4,
                  ingredients: [],
                  ingredientPattern: [],
                  pokemonResults: [{ name: 'Bulbasaur', attractRate: 66.66 }],
                  source: { page: 'https://example.com/2', extractionType: 'test' }
                }
              ]
            }),
            loadState$: of({ status: 'success', data: mockDataset }),
            reload: vi.fn()
          }
        }
      ]
    });

    const service = TestBed.inject(PokemonProfileService);

    service.open('Bulbasaur');

    const profile = service.selectedProfile();

    expect(profile?.recipes).toHaveLength(1);
    expect(profile?.recipes[0].quality).toBe('Special');
    expect(profile?.recipes[0].attractRate).toBe(66.66);
  });

  it('handles branched evolution chains', () => {
    const service = TestBed.inject(PokemonProfileService);

    service.open('Eevee');

    const profile = service.selectedProfile();

    expect(profile?.evolutionChain.map((step) => step.pokemon.name)).toEqual([
      'Eevee',
      'Vaporeon',
      'Jolteon',
      'Flareon'
    ]);
  });
});
