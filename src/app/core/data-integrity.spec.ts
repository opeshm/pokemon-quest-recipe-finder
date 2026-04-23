import dataset from '../../../public/data/recipes.json';
import { POKEMON_QUEST_MOVES } from '../features/moves/data/moves.data';
import { MOVE_ICON_BY_NAME } from '../features/moves/utils/move-icon.util';
import { POKEDEX_ENTRIES } from '../features/pokedex/data/pokedex.data';
import { RecipeAssetService } from './assets/recipe-asset.service';

const moveAssetFiles = new Set(
  Object.keys(import.meta.glob('../../../public/assets/moves/*.png', { eager: true })).map(fileNameFromPath)
);
const typeAssetFiles = new Set(
  Object.keys(import.meta.glob('../../../public/assets/types/*.png', { eager: true })).map(fileNameFromPath)
);
const pokemonAvatarIds = new Set(
  Object.keys(import.meta.glob('../../../public/assets/pokemon/*.png', { eager: true })).map((path) =>
    Number(fileNameFromPath(path).replace('.png', ''))
  )
);

const supportedTypeNames = new Set([
  'Blue',
  'Bug',
  'Dark',
  'Dragon',
  'Electric',
  'Fairy',
  'Fighting',
  'Fire',
  'Flying',
  'Ghost',
  'Grass',
  'Gray',
  'Ground',
  'Ice',
  'Legendary',
  'Mulligan',
  'Misc',
  'Normal',
  'Poison',
  'Psychic',
  'Red',
  'Rock',
  'Steel',
  'Water',
  'Yellow'
]);

function fileNameFromPath(path: string): string {
  return path.split('/').at(-1) ?? path;
}

describe('Shared dataset integrity', () => {
  const recipeAssetService = new RecipeAssetService();
  const pokedexByName = new Map(POKEDEX_ENTRIES.map((entry) => [entry.name, entry]));
  const ingredientNameByCode = new Map(dataset.ingredients.map((ingredient) => [ingredient.code, ingredient.name]));
  const dishBySlug = new Map(dataset.dishIndex.map((dish) => [dish.slug, dish]));
  const spritePokemonByName = new Map(dataset.pokemonIndex.map((pokemon) => [pokemon.name, pokemon]));

  it('keeps recipe dataset metadata aligned with checked-in content', () => {
    expect(dataset.metadata.totalRecipes).toBe(dataset.recipes.length);
    expect(dataset.metadata.totalDishes).toBe(dataset.dishIndex.length);
    expect(dataset.metadata.totalPokemon).toBe(dataset.pokemonIndex.length);
  });

  it('keeps recipe references aligned with dish, ingredient, and pokedex indexes', () => {
    for (const pokemon of dataset.pokemonIndex) {
      const pokedexEntry = pokedexByName.get(pokemon.name);

      expect(pokedexEntry).toBeDefined();
      expect(pokedexEntry?.number).toBe(pokemon.id);
    }

    for (const recipe of dataset.recipes) {
      const indexedDish = dishBySlug.get(recipe.dishSlug);

      expect(indexedDish?.dishName).toBe(recipe.dishName);
      expect(indexedDish?.typeName).toBe(recipe.typeName);
      expect(recipe.ingredientPattern).toHaveLength(
        recipe.ingredients.reduce((total, ingredient) => total + ingredient.quantity, 0)
      );

      for (const ingredient of recipe.ingredients) {
        expect(ingredientNameByCode.get(ingredient.code)).toBe(ingredient.name);
      }

      for (const ingredientCode of recipe.ingredientPattern) {
        expect(ingredientNameByCode.has(ingredientCode)).toBe(true);
      }

      for (const result of recipe.pokemonResults) {
        expect(pokedexByName.has(result.name)).toBe(true);
      }
    }
  });

  it('keeps move data aligned with pokedex entries and move icon assets', () => {
    expect(Object.keys(MOVE_ICON_BY_NAME).sort()).toEqual(
      POKEMON_QUEST_MOVES.map((move) => move.name).sort()
    );

    for (const move of POKEMON_QUEST_MOVES) {
      expect(moveAssetFiles.has(MOVE_ICON_BY_NAME[move.name])).toBe(true);

      for (const pokemonName of move.pokemon) {
        expect(pokedexByName.has(pokemonName)).toBe(true);
      }
    }
  });

  it('keeps type icon assets aligned with every referenced type name', () => {
    const usedTypeNames = new Set([
      ...dataset.dishIndex.map((dish) => dish.typeName),
      ...dataset.recipes.map((recipe) => recipe.typeName),
      ...POKEDEX_ENTRIES.flatMap((entry) => entry.types),
      ...POKEMON_QUEST_MOVES.map((move) => move.type)
    ]);

    expect([...usedTypeNames].filter((typeName) => !supportedTypeNames.has(typeName))).toEqual([]);

    for (const typeName of usedTypeNames) {
      const assetPath = recipeAssetService.typeIconPath(typeName);

      expect(typeAssetFiles.has(fileNameFromPath(assetPath))).toBe(true);
    }
  });

  it('keeps each pokedex entry covered by either shared sprites or avatar assets', () => {
    for (const entry of POKEDEX_ENTRIES) {
      expect(spritePokemonByName.has(entry.name) || pokemonAvatarIds.has(entry.number)).toBe(true);
    }
  });
});
