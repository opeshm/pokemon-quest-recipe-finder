import { Recipe } from '../models/recipe.model';
import { GroupedRecipe, IngredientConfiguration } from '../models/recipe-view.model';

function toIngredientConfiguration(recipe: Recipe): IngredientConfiguration {
  return {
    id: recipe.id,
    ingredients: recipe.ingredients,
    ingredientPattern: recipe.ingredientPattern
  };
}

function getPokemonSignature(recipe: Recipe): string {
  return recipe.pokemonResults
    .map((pokemon) => `${pokemon.name}:${pokemon.attractRate.toFixed(2)}`)
    .join('|');
}

export function groupRecipes(recipes: Recipe[]): GroupedRecipe[] {
  const grouped = new Map<string, GroupedRecipe>();

  for (const recipe of recipes) {
    const key = `${recipe.dishSlug}|${recipe.quality}|${getPokemonSignature(recipe)}`;
    const existing = grouped.get(key);

    if (!existing) {
      grouped.set(key, {
        id: key,
        recipeName: recipe.recipeName,
        dishName: recipe.dishName,
        dishSlug: recipe.dishSlug,
        typeName: recipe.typeName,
        quality: recipe.quality,
        qualityTier: recipe.qualityTier,
        pokemonResults: recipe.pokemonResults,
        source: recipe.source,
        variants: [toIngredientConfiguration(recipe)]
      });
      continue;
    }

    existing.variants.push(toIngredientConfiguration(recipe));
  }

  const list = [...grouped.values()];

  for (const recipe of list) {
    recipe.variants.sort((a, b) => a.id.localeCompare(b.id));
  }

  return list.sort((a, b) => {
    if (a.dishName !== b.dishName) {
      return a.dishName.localeCompare(b.dishName);
    }
    if (a.qualityTier !== b.qualityTier) {
      return b.qualityTier - a.qualityTier;
    }
    return b.variants.length - a.variants.length;
  });
}

export function getPokemonOptions(groupedRecipes: GroupedRecipe[]): string[] {
  const names = new Set<string>();

  for (const recipe of groupedRecipes) {
    for (const pokemon of recipe.pokemonResults) {
      names.add(pokemon.name);
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b));
}

export function getTypeOptions(groupedRecipes: GroupedRecipe[]): string[] {
  const names = new Set(groupedRecipes.map((recipe) => recipe.typeName));
  return [...names].sort((a, b) => a.localeCompare(b));
}
