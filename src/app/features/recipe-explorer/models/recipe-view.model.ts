import { IngredientOption, Recipe } from './recipe.model';

export type IngredientConfiguration = {
  id: string;
  ingredients: Recipe['ingredients'];
  ingredientPattern: Recipe['ingredientPattern'];
};

export type GroupedRecipe = {
  id: string;
  recipeName: string;
  dishName: string;
  dishSlug: string;
  typeName: string;
  quality: Recipe['quality'];
  qualityTier: number;
  pokemonResults: Recipe['pokemonResults'];
  source: Recipe['source'];
  variants: IngredientConfiguration[];
};

export type RecipeCardView = {
  recipe: GroupedRecipe;
  ingredientSummary: string;
  firstVariant: IngredientConfiguration | null;
  visibleVariantCount: number;
};

export type SelectedRecipeView = {
  recipe: GroupedRecipe;
  visibleVariants: IngredientConfiguration[];
  visibleVariantCount: number;
  hiddenVariantCount: number;
};

export type RecipeAssetBindings = {
  getDishSpriteStyle: (slug: string, widthPx?: number) => Record<string, string>;
  getPokemonSpriteStyle: (name: string, sizePx?: number) => Record<string, string>;
  ingredientIconPath: (code: string) => string;
  ingredientLabel: (code: string) => string;
  typeIconPath: (typeName: string) => string;
};

export type FiltersPanelViewModel = {
  searchTerm: string;
  selectedQualities: string[];
  selectedPokemon: string[];
  selectedTypes: string[];
  qualityOptions: readonly string[];
  typeOptions: string[];
  pokemonOptions: string[];
  ingredients: IngredientOption[];
  hasInventoryFilter: boolean;
  selectedInventory: ReadonlySet<string>;
};

export type RecipeListPanelViewModel = {
  cards: RecipeCardView[];
  selectedRecipeId: string | null;
};

export type RecipeDetailPanelViewModel = {
  selectedRecipeView: SelectedRecipeView | null;
  maxAttractRate: number;
};

export type PokemonProfileTrigger = {
  openPokemonProfile: (name: string) => void;
};
