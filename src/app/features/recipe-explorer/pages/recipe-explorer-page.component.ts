import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersPanelComponent } from '../components/filters-panel/filters-panel.component';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';
import { RecipeDetailPanelComponent } from '../components/recipe-detail-panel/recipe-detail-panel.component';
import { RecipeListPanelComponent } from '../components/recipe-list-panel/recipe-list-panel.component';
import { RecipeExplorerFacade } from '../facade/recipe-explorer.facade';
import { FiltersPanelViewModel, PokemonProfileTrigger, RecipeAssetBindings, RecipeDetailPanelViewModel, RecipeListPanelViewModel } from '../models/recipe-view.model';
import { RecipeAssetService } from '../services/recipe-asset.service';
import { PokemonProfileService } from '../../../shared/pokemon-profile/pokemon-profile.service';

@Component({
  selector: 'app-recipe-explorer-page',
  imports: [
    CommonModule,
    HeroSectionComponent,
    FiltersPanelComponent,
    RecipeListPanelComponent,
    RecipeDetailPanelComponent
  ],
  templateUrl: './recipe-explorer-page.component.html',
  styleUrl: './recipe-explorer-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeExplorerPageComponent {
  readonly facade = inject(RecipeExplorerFacade);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly recipeAssetService = inject(RecipeAssetService);
  private readonly pokemonProfileService = inject(PokemonProfileService);

  private isHydratingFromUrl = false;

  readonly pokemonSpriteStyleFn = (name: string, sizePx?: number) =>
    this.recipeAssetService.getPokemonSpriteStyle(
      name,
      this.facade.dataset()?.pokemonIndex ?? [],
      this.facade.pokemonSpriteByName(),
      this.facade.dataset()?.sprites,
      sizePx
    );

  readonly dishSpriteStyleFn = (slug: string, widthPx?: number) =>
    this.recipeAssetService.getDishSpriteStyle(
      slug,
      this.facade.dishSpriteBySlug(),
      this.facade.dataset()?.dishSprites,
      widthPx
    );

  readonly ingredientIconPathFn = (code: string) => this.recipeAssetService.ingredientIconPath(code);
  readonly ingredientLabelFn = (code: string) =>
    this.recipeAssetService.ingredientLabel(code, this.facade.ingredientNameByCode());
  readonly typeIconPathFn = (typeName: string) => this.recipeAssetService.typeIconPath(typeName);

  readonly assetBindings: RecipeAssetBindings = {
    getDishSpriteStyle: (slug, widthPx) => this.dishSpriteStyleFn(slug, widthPx),
    getPokemonSpriteStyle: (name, sizePx) => this.pokemonSpriteStyleFn(name, sizePx),
    ingredientIconPath: (code) => this.ingredientIconPathFn(code),
    ingredientLabel: (code) => this.ingredientLabelFn(code),
    typeIconPath: (typeName) => this.typeIconPathFn(typeName)
  };

  readonly pokemonProfileBindings: PokemonProfileTrigger = {
    openPokemonProfile: (name) => this.pokemonProfileService.open(name)
  };

  readonly filtersVm = () =>
    ({
      searchTerm: this.facade.searchTerm(),
      selectedQualities: this.facade.selectedQualities(),
      selectedPokemon: this.facade.selectedPokemon(),
      selectedTypes: this.facade.selectedTypes(),
      qualityOptions: this.facade.qualityOptions,
      typeOptions: this.facade.typeOptions(),
      pokemonOptions: this.facade.pokemonOptions(),
      ingredients: this.facade.dataset()?.ingredients ?? [],
      hasInventoryFilter: this.facade.hasInventoryFilter(),
      selectedInventory: this.facade.inventoryIngredientSet()
    }) satisfies FiltersPanelViewModel;

  readonly recipeListVm = () =>
    ({
      cards: this.facade.recipeCards(),
      selectedRecipeId: this.facade.selectedRecipeId()
    }) satisfies RecipeListPanelViewModel;

  readonly recipeDetailVm = () =>
    ({
      selectedRecipeView: this.facade.selectedRecipeView(),
      maxAttractRate: this.facade.maxAttractRate()
    }) satisfies RecipeDetailPanelViewModel;

  constructor() {
    const queryParamMap = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });

    effect(() => {
      const queryParams = queryParamMap();
      const nextParams = {
        search: queryParams.get('search') ?? undefined,
        quality: queryParams.get('quality') ?? undefined,
        pokemon: queryParams.get('pokemon') ?? undefined,
        type: queryParams.get('type') ?? undefined,
        inventory: queryParams.get('inventory') ?? undefined,
        recipe: queryParams.get('recipe') ?? undefined
      };

      this.isHydratingFromUrl = true;
      this.facade.hydrateFromQueryParams(nextParams);
      queueMicrotask(() => {
        this.isHydratingFromUrl = false;
      });
    });

    effect(() => {
      if (this.isHydratingFromUrl) {
        return;
      }

      const nextQueryParams = this.facade.buildQueryParams();
      const currentQueryParams = this.route.snapshot.queryParams;

      if (this.areQueryParamsEqual(currentQueryParams, nextQueryParams)) {
        return;
      }

      void this.router.navigate([], {
        relativeTo: this.route,
        queryParams: nextQueryParams,
        replaceUrl: true
      });
    });

    this.destroyRef.onDestroy(() => {
      this.isHydratingFromUrl = false;
    });
  }

  private areQueryParamsEqual(
    current: Record<string, unknown>,
    next: Record<string, string | null>
  ): boolean {
    const currentEntries = Object.entries(current)
      .filter(([, value]) => value != null && value !== '')
      .map(([key, value]) => [key, String(value)]);
    const nextEntries = Object.entries(next)
      .filter(([, value]) => value != null && value !== '')
      .map(([key, value]) => [key, String(value)]);

    if (currentEntries.length !== nextEntries.length) {
      return false;
    }

    return nextEntries.every(([key, value]) => current[key] === value);
  }
}
