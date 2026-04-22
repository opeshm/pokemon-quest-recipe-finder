import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LoadState } from '../../recipe-explorer/models/load-state.model';
import { RecipeDataset } from '../../recipe-explorer/models/recipe.model';
import { RecipeAssetService } from '../../recipe-explorer/services/recipe-asset.service';
import { RecipeDataService } from '../../recipe-explorer/services/recipe-data.service';
import { POKEDEX_ENTRIES } from '../data/pokedex.data';
import { PokedexEntry, PokemonStyle } from '../models/pokedex.model';

@Component({
  selector: 'app-pokedex-page',
  imports: [CommonModule],
  templateUrl: './pokedex-page.component.html',
  styleUrl: './pokedex-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokedexPageComponent {
  private readonly recipeDataService = inject(RecipeDataService);
  private readonly recipeAssetService = inject(RecipeAssetService);

  private readonly _selectedStyle = signal<PokemonStyle | ''>('');
  private readonly _selectedType = signal('');

  readonly entries = POKEDEX_ENTRIES;
  readonly styleOptions: PokemonStyle[] = ['Melee', 'Range'];
  readonly dataset = toSignal(this.recipeDataService.dataset$, { initialValue: null });
  readonly loadState = toSignal(this.recipeDataService.loadState$, {
    initialValue: { status: 'loading' } as LoadState<RecipeDataset>
  });
  readonly selectedStyle = this._selectedStyle.asReadonly();
  readonly selectedType = this._selectedType.asReadonly();

  readonly pokemonSpriteByName = computed(
    () => new Map((this.dataset()?.pokemonIndex ?? []).map((entry) => [entry.name, entry]))
  );

  readonly typeOptions = computed(() =>
    [...new Set(this.entries.flatMap((entry) => entry.types))].sort((left, right) =>
      left.localeCompare(right)
    )
  );

  readonly filteredEntries = computed(() => {
    const style = this.selectedStyle();
    const type = this.selectedType();

    return this.entries.filter(
      (entry) => (!style || entry.style === style) && (!type || entry.types.includes(type))
    );
  });

  readonly spriteWarning = computed(() =>
    this.loadState().status === 'error'
      ? 'Pokemon sprites are unavailable right now, but the full Pokedex is still available.'
      : null
  );

  toggleStyle(style: PokemonStyle): void {
    this._selectedStyle.set(this.selectedStyle() === style ? '' : style);
  }

  toggleType(type: string): void {
    this._selectedType.set(this.selectedType() === type ? '' : type);
  }

  clearFilters(): void {
    this._selectedStyle.set('');
    this._selectedType.set('');
  }

  hasSprite(name: string): boolean {
    return this.pokemonSpriteByName().has(name);
  }

  pokemonAvatarPath(number: number): string {
    return this.recipeAssetService.pokemonAvatarPath(number);
  }

  pokemonSpriteStyle(name: string): Record<string, string> {
    return this.recipeAssetService.getPokemonSpriteStyle(
      name,
      this.dataset()?.pokemonIndex ?? [],
      this.pokemonSpriteByName(),
      this.dataset()?.sprites,
      72
    );
  }

  typeIconPath(typeName: string): string {
    return this.recipeAssetService.typeIconPath(typeName);
  }

  trackByNumber(_: number, entry: PokedexEntry): number {
    return entry.number;
  }
}
