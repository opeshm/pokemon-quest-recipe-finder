import { GroupedRecipe, IngredientConfiguration, RecipeCardView, SelectedRecipeView } from '../models/recipe-view.model';
import { getIngredientSummary, getVisibleVariants } from './recipe-summary.util';

export function buildRecipeCards(
  filteredRecipes: GroupedRecipe[],
  visibleVariantsByRecipeId: Map<string, IngredientConfiguration[]>
): RecipeCardView[] {
  return filteredRecipes.map((recipe) => {
    const visibleVariants = getVisibleVariants(recipe, visibleVariantsByRecipeId);

    return {
      recipe,
      ingredientSummary: getIngredientSummary(recipe, visibleVariantsByRecipeId),
      firstVariant: visibleVariants[0] ?? null,
      visibleVariantCount: visibleVariants.length
    };
  });
}

export function buildSelectedRecipeView(
  selectedRecipe: GroupedRecipe | null,
  visibleVariantsByRecipeId: Map<string, IngredientConfiguration[]>
): SelectedRecipeView | null {
  if (!selectedRecipe) {
    return null;
  }

  const visibleVariants = getVisibleVariants(selectedRecipe, visibleVariantsByRecipeId);

  return {
    recipe: selectedRecipe,
    visibleVariants,
    visibleVariantCount: visibleVariants.length,
    hiddenVariantCount: selectedRecipe.variants.length - visibleVariants.length
  };
}
