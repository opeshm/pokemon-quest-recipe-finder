import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadState } from '../models/load-state.model';
import { DishSpriteEntry, PokemonSpriteEntry, RecipeDataset } from '../models/recipe.model';
import { RecipeExplorerFilters } from '../models/recipe-filters.model';
import { GroupedRecipe } from '../models/recipe-view.model';
import { RecipeDataService } from '../services/recipe-data.service';
import {
  buildVisibleVariantsByRecipeId,
  filterGroupedRecipes,
  getNormalizedSelectedRecipeId,
  getSelectedRecipe
} from '../utils/recipe-filtering.util';
import { getPokemonOptions, getTypeOptions, groupRecipes } from '../utils/recipe-grouping.util';
import { buildIngredientNameByCode, getVisibleVariants } from '../utils/recipe-summary.util';
import { buildRecipeCards, buildSelectedRecipeView } from '../utils/recipe-view-mapper.util';

const QUALITY_OPTIONS = ['Special', 'Very Good', 'Good', 'Normal'] as const;

@Injectable({ providedIn: 'root' })
export class RecipeExplorerFacade {
  private readonly recipeDataService = inject(RecipeDataService);

  readonly loadState = toSignal(this.recipeDataService.loadState$, {
    initialValue: { status: 'loading' } as LoadState<RecipeDataset>
  });
  readonly dataset = toSignal(this.recipeDataService.dataset$, { initialValue: null });

  private readonly _searchTerm = signal('');
  private readonly _selectedQualities = signal<string[]>([]);
  private readonly _selectedPokemon = signal<string[]>([]);
  private readonly _selectedTypes = signal<string[]>([]);
  private readonly _inventoryIngredients = signal<string[]>([]);
  private readonly _selectedRecipeId = signal<string | null>(null);

  readonly searchTerm = this._searchTerm.asReadonly();
  readonly selectedQualities = this._selectedQualities.asReadonly();
  readonly selectedPokemon = this._selectedPokemon.asReadonly();
  readonly selectedTypes = this._selectedTypes.asReadonly();
  readonly inventoryIngredients = this._inventoryIngredients.asReadonly();
  readonly selectedRecipeId = this._selectedRecipeId.asReadonly();

  readonly qualityOptions = QUALITY_OPTIONS;
  readonly isLoading = computed(() => this.loadState().status === 'loading');
  readonly loadError = computed(() => {
    const loadState = this.loadState();
    return loadState.status === 'error' ? loadState.message : null;
  });
  readonly hasData = computed(() => this.loadState().status === 'success');

  readonly filters = computed<RecipeExplorerFilters>(() => ({
    searchTerm: this.searchTerm(),
    selectedQualities: this.selectedQualities(),
    selectedPokemon: this.selectedPokemon(),
    selectedTypes: this.selectedTypes(),
    inventoryIngredients: this.inventoryIngredients()
  }));

  readonly recipes = computed(() => this.dataset()?.recipes ?? []);
  readonly groupedRecipes = computed(() => groupRecipes(this.recipes()));
  readonly pokemonOptions = computed(() => getPokemonOptions(this.groupedRecipes()));
  readonly typeOptions = computed(() => getTypeOptions(this.groupedRecipes()));
  readonly ingredientNameByCode = computed(() => buildIngredientNameByCode(this.dataset()?.ingredients ?? []));
  readonly inventoryIngredientSet = computed(() => new Set(this.inventoryIngredients()));
  readonly hasInventoryFilter = computed(() => this.inventoryIngredients().length > 0);

  readonly pokemonSpriteByName = computed(() => {
    const map = new Map<string, PokemonSpriteEntry>();

    for (const entry of this.dataset()?.pokemonIndex ?? []) {
      map.set(entry.name, entry);
    }

    return map;
  });

  readonly dishSpriteBySlug = computed(() => {
    const map = new Map<string, DishSpriteEntry>();

    for (const entry of this.dataset()?.dishIndex ?? []) {
      map.set(entry.slug, entry);
    }

    return map;
  });

  readonly visibleVariantsByRecipeId = computed(() =>
    buildVisibleVariantsByRecipeId(this.groupedRecipes(), this.inventoryIngredientSet())
  );

  readonly filteredRecipes = computed(() =>
    filterGroupedRecipes(this.groupedRecipes(), this.visibleVariantsByRecipeId(), {
      searchTerm: this.searchTerm(),
      qualities: this.selectedQualities(),
      pokemon: this.selectedPokemon(),
      types: this.selectedTypes()
    })
  );

  readonly selectedRecipe = computed(() => getSelectedRecipe(this.filteredRecipes(), this.selectedRecipeId()));

  readonly maxAttractRate = computed(() => {
    const recipe = this.selectedRecipe();

    if (!recipe?.pokemonResults.length) {
      return 0;
    }

    return recipe.pokemonResults[0].attractRate;
  });

  readonly recipeCards = computed(() => buildRecipeCards(this.filteredRecipes(), this.visibleVariantsByRecipeId()));
  readonly selectedRecipeView = computed(() => buildSelectedRecipeView(this.selectedRecipe(), this.visibleVariantsByRecipeId()));

  constructor() {
    effect(() => {
      const current = this.selectedRecipeId();
      const normalizedSelectedRecipeId = getNormalizedSelectedRecipeId(this.filteredRecipes(), current);

      if (current !== normalizedSelectedRecipeId) {
        this._selectedRecipeId.set(normalizedSelectedRecipeId);
      }
    });
  }

  setSearchTerm(searchTerm: string): void {
    this._searchTerm.set(searchTerm);
  }

  setSelectedQualities(qualities: string[]): void {
    this._selectedQualities.set([...qualities]);
  }

  setSelectedPokemon(pokemon: string[]): void {
    this._selectedPokemon.set([...pokemon]);
  }

  setSelectedTypes(types: string[]): void {
    this._selectedTypes.set([...types]);
  }

  setInventoryIngredients(ingredients: string[]): void {
    this._inventoryIngredients.set([...ingredients]);
  }

  selectRecipe(recipeId: string): void {
    this._selectedRecipeId.set(recipeId);
  }

  setSelectedRecipeId(recipeId: string | null): void {
    this._selectedRecipeId.set(recipeId);
  }

  hydrateFromQueryParams(params: Partial<Record<'search' | 'quality' | 'pokemon' | 'type' | 'inventory' | 'recipe', string>>): void {
    this._searchTerm.set(params.search ?? '');
    this._selectedQualities.set(this.parseListParam(params.quality, new Set(this.qualityOptions)));
    this._selectedPokemon.set(this.parseListParam(params.pokemon));
    this._selectedTypes.set(this.parseListParam(params.type));
    this._inventoryIngredients.set(this.parseInventoryParam(params.inventory));
    this._selectedRecipeId.set(params.recipe ?? null);
  }

  buildQueryParams(): Record<string, string | null> {
    return {
      search: this.searchTerm() || null,
      quality: this.selectedQualities().length ? this.selectedQualities().join(',') : null,
      pokemon: this.selectedPokemon().length ? this.selectedPokemon().join(',') : null,
      type: this.selectedTypes().length ? this.selectedTypes().join(',') : null,
      inventory: this.inventoryIngredients().length ? this.inventoryIngredients().join(',') : null,
      recipe: this.selectedRecipeId() || null
    };
  }

  clearFilters(): void {
    this._searchTerm.set('');
    this._selectedQualities.set([]);
    this._selectedPokemon.set([]);
    this._selectedTypes.set([]);
    this._inventoryIngredients.set([]);
  }

  toggleQuality(quality: string): void {
    const current = this.selectedQualities();
    this._selectedQualities.set(
      current.includes(quality) ? current.filter((entry) => entry !== quality) : [...current, quality]
    );
  }

  toggleType(typeName: string): void {
    const current = this.selectedTypes();
    this._selectedTypes.set(
      current.includes(typeName) ? current.filter((entry) => entry !== typeName) : [...current, typeName]
    );
  }

  togglePokemon(name: string): void {
    const current = this.selectedPokemon();
    this._selectedPokemon.set(
      current.includes(name) ? current.filter((entry) => entry !== name) : [...current, name]
    );
  }

  clearInventoryIngredients(): void {
    this._inventoryIngredients.set([]);
  }

  toggleInventoryIngredient(code: string): void {
    const current = this.inventoryIngredients();

    if (current.includes(code)) {
      this._inventoryIngredients.set(current.filter((entry) => entry !== code));
      return;
    }

    this._inventoryIngredients.set([...current, code]);
  }

  visibleVariants(recipe: GroupedRecipe) {
    return getVisibleVariants(recipe, this.visibleVariantsByRecipeId());
  }

  retryLoad(): void {
    this.recipeDataService.reload();
  }

  private parseInventoryParam(inventory: string | undefined): string[] {
    return this.parseListParam(inventory);
  }

  private parseListParam(value: string | undefined, allowedValues?: ReadonlySet<string>): string[] {
    if (!value) {
      return [];
    }

    const values = value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);

    const uniqueValues = [...new Set(values)];

    if (!allowedValues) {
      return uniqueValues;
    }

    return uniqueValues.filter((entry) => allowedValues.has(entry));
  }
}
