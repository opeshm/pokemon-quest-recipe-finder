import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RecipeAssetService } from '../../core/assets/recipe-asset.service';
import { RECIPES_REPOSITORY, RecipesRepository } from '../../core/data-access/recipes.repository';
import { PokedexEntry } from '../../features/pokedex/models/pokedex.model';
import { PokemonProfileService } from './pokemon-profile.service';

const STONE_ICON_BY_NAME: Record<string, string> = {
  'Broadburst Stone': 'broadburststone.png',
  'Scattershot Stone': 'scattershotstone.png',
  'Sharing Stone': 'sharingstone.png',
  'Stay Strong Stone': 'staystrongstone.png',
  'Wait Less Stone': 'waitlessstone.png',
  'Whack-Whack Stone': 'whack-whackstone.png'
};

@Component({
  selector: 'app-pokemon-profile-modal',
  imports: [CommonModule],
  templateUrl: './pokemon-profile-modal.component.html',
  styleUrl: './pokemon-profile-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonProfileModalComponent {
  readonly profileService = inject(PokemonProfileService);

  private readonly recipesRepository = inject<RecipesRepository>(RECIPES_REPOSITORY);
  private readonly recipeAssetService = inject(RecipeAssetService);

  readonly dataset = toSignal(this.recipesRepository.dataset$, { initialValue: null });
  readonly view = this.profileService.selectedView;
  readonly profile = this.profileService.selectedProfile;
  readonly pokemonSpriteByName = computed(
    () => new Map((this.dataset()?.pokemonIndex ?? []).map((entry) => [entry.name, entry]))
  );
  readonly dishSpriteBySlug = computed(
    () => new Map((this.dataset()?.dishIndex ?? []).map((entry) => [entry.slug, entry]))
  );
  readonly ingredientNameByCode = computed(
    () => new Map((this.dataset()?.ingredients ?? []).map((entry) => [entry.code, entry.name]))
  );

  close(): void {
    this.profileService.close();
  }

  openPokemon(name: string): void {
    this.profileService.open(name);
  }

  openMove(name: string): void {
    this.profileService.openMove(name);
  }

  openRecipe(id: string, pokemonName?: string): void {
    this.profileService.openRecipe(id, pokemonName ?? null);
  }

  typeIconPath(typeName: string): string {
    return this.recipeAssetService.typeIconPath(typeName);
  }

  pokemonSpriteStyle(name: string, sizePx = 72): Record<string, string> {
    return this.recipeAssetService.getPokemonSpriteStyle(
      name,
      this.dataset()?.pokemonIndex ?? [],
      this.pokemonSpriteByName(),
      this.dataset()?.sprites,
      sizePx
    );
  }

  pokemonAvatarPath(number: number): string {
    return this.recipeAssetService.pokemonAvatarPath(number);
  }

  pokemonAvatarPathByName(name: string): string {
    return this.pokemonAvatarPath(this.profileService.pokemonNumberByName.get(name) ?? 1);
  }

  stoneIconPath(name: string): string {
    return `assets/stones/${STONE_ICON_BY_NAME[name]}`;
  }

  ingredientIconPath(code: string): string {
    return this.recipeAssetService.ingredientIconPath(code);
  }

  ingredientLabel(code: string): string {
    return this.recipeAssetService.ingredientLabel(code, this.ingredientNameByCode());
  }

  getRateFill(rate: number, maxRate: number): number {
    if (maxRate <= 0) {
      return 0;
    }

    return Math.max(0, Math.min(1, rate / maxRate));
  }

  hasSprite(name: string): boolean {
    return this.pokemonSpriteByName().has(name);
  }

  dishSpriteStyle(slug: string, widthPx = 94): Record<string, string> {
    return this.recipeAssetService.getDishSpriteStyle(
      slug,
      this.dishSpriteBySlug(),
      this.dataset()?.dishSprites,
      widthPx
    );
  }

  evolutionRequirementLabel(requirement: string): string {
    return requirement.replace(/^Lv\.\s*/i, 'Lv. ');
  }

  evolutionTrackBy(_: number, entry: { pokemon: PokedexEntry }): number {
    return entry.pokemon.number;
  }
}
