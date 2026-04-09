import {
  buildVisibleVariantsByRecipeId,
  filterGroupedRecipes,
  getNormalizedSelectedRecipeId,
  getSelectedRecipe,
  getVisiblePokemonOptions
} from './recipe-filtering.util';
import { groupRecipes, getPokemonOptions, getTypeOptions } from './recipe-grouping.util';
import { buildIngredientNameByCode, getIngredientSummary, getVariantSummary, getVisibleVariants } from './recipe-summary.util';
import { buildRecipeCards, buildSelectedRecipeView } from './recipe-view-mapper.util';
import { RecipeDataset } from '../models/recipe.model';

const mockDataset: RecipeDataset = {
  metadata: {
    title: 'Pokemon Quest Recipe Finder Dataset',
    source: 'https://pokequestrecipes.me',
    generatedAt: '2026-03-30T00:00:00.000Z',
    totalRecipes: 3,
    totalDishes: 2,
    totalPokemon: 3,
    scannedPages: 1,
    rateLimitMs: 250
  },
  ingredients: [
    { code: 'bm', name: 'Balm Mushroom' },
    { code: 'br', name: 'Big Root' },
    { code: 'hn', name: 'Honey' }
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
    { id: 4, name: 'Charmander', spriteCol: 3, spriteRow: 0 },
    { id: 133, name: 'Eevee', spriteCol: 4, spriteRow: 1 }
  ],
  dishIndex: [
    {
      slug: 'mulligan-stew-a-la-cube',
      dishName: 'Mulligan Stew a la Cube',
      typeName: 'Misc',
      spriteCol: 0,
      spriteRow: 0
    },
    {
      slug: 'honey-nectar-a-la-cube',
      dishName: 'Honey Nectar a la Cube',
      typeName: 'Yellow',
      spriteCol: 1,
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
    },
    {
      id: 'honey-nectar-a-la-cube-good-001',
      recipeName: 'Honey Nectar a la Cube',
      dishName: 'Honey Nectar a la Cube',
      dishSlug: 'honey-nectar-a-la-cube',
      typeName: 'Yellow',
      quality: 'Good',
      qualityTier: 2,
      ingredients: [{ code: 'hn', name: 'Honey', quantity: 5 }],
      ingredientPattern: ['hn', 'hn', 'hn', 'hn', 'hn'],
      pokemonResults: [{ name: 'Eevee', attractRate: 100 }],
      source: {
        page: 'https://pokequestrecipes.me/types/honey-nectar-a-la-cube/',
        extractionType: 'next-data-script'
      }
    }
  ]
};

describe('recipe utilities', () => {
  it('groups recipes and sorts options', () => {
    const grouped = groupRecipes(mockDataset.recipes);

    expect(grouped).toHaveLength(2);
    expect(grouped[0].variants).toHaveLength(1);
    expect(grouped[1].variants).toHaveLength(2);
    expect(getPokemonOptions(grouped)).toEqual(['Bulbasaur', 'Charmander', 'Eevee']);
    expect(getTypeOptions(grouped)).toEqual(['Misc', 'Yellow']);
  });

  it('filters visible variants by inventory and builds summaries', () => {
    const grouped = groupRecipes(mockDataset.recipes);
    const mulligan = grouped.find((recipe) => recipe.dishSlug === 'mulligan-stew-a-la-cube');

    expect(mulligan).toBeTruthy();

    const visibleVariantsByRecipeId = buildVisibleVariantsByRecipeId(grouped, ['bm']);
    const visibleVariants = getVisibleVariants(mulligan!, visibleVariantsByRecipeId);

    expect(visibleVariants).toHaveLength(0);
    expect(getIngredientSummary(mulligan!, visibleVariantsByRecipeId)).toBe('No ingredient configuration');

    const allVisibleVariantsByRecipeId = buildVisibleVariantsByRecipeId(grouped, ['bm', 'br', 'hn']);
    const allVisibleVariants = getVisibleVariants(mulligan!, allVisibleVariantsByRecipeId);

    expect(allVisibleVariants).toHaveLength(2);
    expect(getIngredientSummary(mulligan!, allVisibleVariantsByRecipeId)).toBe('2 ingredient configurations');
    expect(getVariantSummary(allVisibleVariants[0])).toContain('Balm Mushroom');
  });

  it('filters grouped recipes by search and typed criteria', () => {
    const grouped = groupRecipes(mockDataset.recipes);
    const visibleVariantsByRecipeId = buildVisibleVariantsByRecipeId(grouped, []);

    expect(
      filterGroupedRecipes(grouped, visibleVariantsByRecipeId, {
        searchTerm: 'eevee',
        quality: '',
        pokemon: '',
        type: ''
      })
    ).toHaveLength(1);

    expect(
      filterGroupedRecipes(grouped, visibleVariantsByRecipeId, {
        searchTerm: '',
        quality: 'Special',
        pokemon: 'Bulbasaur',
        type: 'Misc'
      })
    ).toHaveLength(1);
  });

  it('selects and normalizes the selected recipe id', () => {
    const grouped = groupRecipes(mockDataset.recipes);
    const visibleVariantsByRecipeId = buildVisibleVariantsByRecipeId(grouped, []);
    const filtered = filterGroupedRecipes(grouped, visibleVariantsByRecipeId, {
      searchTerm: '',
      quality: '',
      pokemon: '',
      type: ''
    });

    expect(getSelectedRecipe(filtered, null)?.id).toBe(filtered[0].id);
    expect(getNormalizedSelectedRecipeId(filtered, 'missing-id')).toBe(filtered[0].id);
    expect(getNormalizedSelectedRecipeId([], 'missing-id')).toBeNull();
  });

  it('builds recipe cards and selected recipe view models', () => {
    const grouped = groupRecipes(mockDataset.recipes);
    const visibleVariantsByRecipeId = buildVisibleVariantsByRecipeId(grouped, []);
    const cards = buildRecipeCards(grouped, visibleVariantsByRecipeId);

    expect(cards).toHaveLength(2);
    expect(cards[1].visibleVariantCount).toBe(2);

    const selected = buildSelectedRecipeView(grouped[1], visibleVariantsByRecipeId);
    expect(selected?.visibleVariantCount).toBe(2);
    expect(selected?.hiddenVariantCount).toBe(0);
  });

  it('filters pokemon options by query and builds ingredient lookup map', () => {
    const grouped = groupRecipes(mockDataset.recipes);
    const pokemonOptions = getPokemonOptions(grouped);
    const ingredientNameByCode = buildIngredientNameByCode(mockDataset.ingredients);

    expect(getVisiblePokemonOptions(pokemonOptions, 'char')).toEqual(['Charmander']);
    expect(ingredientNameByCode.get('hn')).toBe('Honey');
  });
});
