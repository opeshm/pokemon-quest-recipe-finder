import { IngredientOption } from '../models/recipe.model';
import { GroupedRecipe, IngredientConfiguration } from '../models/recipe-view.model';

export function buildIngredientNameByCode(ingredients: IngredientOption[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const ingredient of ingredients) {
    map.set(ingredient.code, ingredient.name);
  }

  return map;
}

export function getVisibleVariants(
  recipe: GroupedRecipe,
  visibleVariantsByRecipeId: Map<string, IngredientConfiguration[]>
): IngredientConfiguration[] {
  return visibleVariantsByRecipeId.get(recipe.id) ?? [];
}

export function getVariantSummary(variant: IngredientConfiguration): string {
  return variant.ingredients.map((item) => `${item.quantity}x ${item.name}`).join(', ');
}

export function getIngredientSummary(
  recipe: GroupedRecipe,
  visibleVariantsByRecipeId: Map<string, IngredientConfiguration[]>
): string {
  const visibleVariants = getVisibleVariants(recipe, visibleVariantsByRecipeId);

  if (!visibleVariants.length) {
    return 'No ingredient configuration';
  }

  if (visibleVariants.length === 1) {
    return getVariantSummary(visibleVariants[0]);
  }

  return `${visibleVariants.length} ingredient configurations`;
}
