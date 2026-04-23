import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RecipeAssetService } from '../../core/assets/recipe-asset.service';
import { RecipeDataService } from '../../core/data-access/recipe-data.service';
import { PokedexEntry } from '../../features/pokedex/models/pokedex.model';
import { PokemonProfileService } from './pokemon-profile.service';

@Component({
  selector: 'app-pokemon-profile-modal',
  imports: [CommonModule],
  templateUrl: './pokemon-profile-modal.component.html',
  styleUrl: './pokemon-profile-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonProfileModalComponent {
  readonly profileService = inject(PokemonProfileService);

  private readonly recipeDataService = inject(RecipeDataService);
  private readonly recipeAssetService = inject(RecipeAssetService);

  readonly dataset = toSignal(this.recipeDataService.dataset$, { initialValue: null });
  readonly profile = this.profileService.selectedProfile;
  readonly pokemonSpriteByName = computed(
    () => new Map((this.dataset()?.pokemonIndex ?? []).map((entry) => [entry.name, entry]))
  );
  readonly dishSpriteBySlug = computed(
    () => new Map((this.dataset()?.dishIndex ?? []).map((entry) => [entry.slug, entry]))
  );

  constructor() {
    effect(() => {
      this.profileService.setRecipes(this.dataset()?.recipes ?? []);
    });
  }

  close(): void {
    this.profileService.close();
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
