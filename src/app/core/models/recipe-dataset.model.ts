export interface DatasetMetadata {
  title: string;
  source: string;
  generatedAt: string;
  totalRecipes: number;
  totalDishes: number;
  totalPokemon: number;
  scannedPages: number;
  rateLimitMs: number;
}

export interface SpriteMetadata {
  file: string;
  columns: number;
  cellSizePx: number;
  iconSizePx: number;
  borderPx: number;
}

export interface DishSpriteMetadata {
  file: string;
  columns: number;
  rows: number;
  cellWidthPx: number;
  cellHeightPx: number;
  iconWidthPx: number;
  iconHeightPx: number;
  borderPx: number;
}

export interface PokemonSpriteEntry {
  id: number;
  name: string;
  spriteCol: number;
  spriteRow: number;
}

export interface DishSpriteEntry {
  slug: string;
  dishName: string;
  typeName: string;
  spriteCol: number;
  spriteRow: number;
}

export interface IngredientOption {
  code: string;
  name: string;
}

export interface RecipeIngredient {
  code: string;
  name: string;
  quantity: number;
}

export interface PokemonResult {
  name: string;
  attractRate: number;
}

export interface Recipe {
  id: string;
  recipeName: string;
  dishName: string;
  dishSlug: string;
  typeName: string;
  quality: 'Normal' | 'Good' | 'Very Good' | 'Special';
  qualityTier: number;
  ingredients: RecipeIngredient[];
  ingredientPattern: string[];
  pokemonResults: PokemonResult[];
  source: {
    page: string;
    extractionType: string;
  };
}

export interface RecipeDataset {
  metadata: DatasetMetadata;
  sprites: SpriteMetadata;
  dishSprites: DishSpriteMetadata;
  ingredients: IngredientOption[];
  pokemonIndex: PokemonSpriteEntry[];
  dishIndex: DishSpriteEntry[];
  recipes: Recipe[];
}
