import { GroupedRecipe, IngredientConfiguration } from '../models/recipe-view.model';

export type RecipeFilterCriteria = {
  searchTerm: string;
  qualities: string[];
  pokemon: string[];
  types: string[];
};

export function buildVisibleVariantsByRecipeId(
  groupedRecipes: GroupedRecipe[],
  inventoryIngredients: Iterable<string>
): Map<string, IngredientConfiguration[]> {
  const inventory = new Set(inventoryIngredients);
  const map = new Map<string, IngredientConfiguration[]>();

  for (const recipe of groupedRecipes) {
    if (!inventory.size) {
      map.set(recipe.id, recipe.variants);
      continue;
    }

    map.set(
      recipe.id,
      recipe.variants.filter((variant) => variant.ingredients.every((ingredient) => inventory.has(ingredient.code)))
    );
  }

  return map;
}

export function filterGroupedRecipes(
  groupedRecipes: GroupedRecipe[],
  visibleVariantsByRecipeId: Map<string, IngredientConfiguration[]>,
  criteria: RecipeFilterCriteria
): GroupedRecipe[] {
  const query = criteria.searchTerm.trim().toLowerCase();

  return groupedRecipes.filter((recipe) => {
    const visibleVariants = visibleVariantsByRecipeId.get(recipe.id) ?? [];
    if (!visibleVariants.length) {
      return false;
    }

    if (criteria.qualities.length && !criteria.qualities.includes(recipe.quality)) {
      return false;
    }

    if (criteria.pokemon.length && !criteria.pokemon.some((name) => recipe.pokemonResults.some((entry) => entry.name === name))) {
      return false;
    }

    if (criteria.types.length && !criteria.types.includes(recipe.typeName)) {
      return false;
    }

    if (!query) {
      return true;
    }

    const inDish = recipe.dishName.toLowerCase().includes(query);
    const inType = recipe.typeName.toLowerCase().includes(query);
    const inIngredients = visibleVariants.some((variant) =>
      variant.ingredients.some((item) => item.name.toLowerCase().includes(query))
    );
    const inPokemon = recipe.pokemonResults.some((entry) => entry.name.toLowerCase().includes(query));

    return inDish || inType || inIngredients || inPokemon;
  });
}

export function getSelectedRecipe(
  filteredRecipes: GroupedRecipe[],
  selectedRecipeId: string | null
): GroupedRecipe | null {
  if (!filteredRecipes.length) {
    return null;
  }

  if (!selectedRecipeId) {
    return filteredRecipes[0];
  }

  return filteredRecipes.find((recipe) => recipe.id === selectedRecipeId) ?? filteredRecipes[0];
}

export function getNormalizedSelectedRecipeId(
  filteredRecipes: GroupedRecipe[],
  selectedRecipeId: string | null
): string | null {
  const selectedRecipe = getSelectedRecipe(filteredRecipes, selectedRecipeId);
  return selectedRecipe?.id ?? null;
}
