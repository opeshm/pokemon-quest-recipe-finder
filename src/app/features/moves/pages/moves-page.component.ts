import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RecipeDataset } from '../../recipe-explorer/models/recipe.model';
import { RecipeAssetService } from '../../recipe-explorer/services/recipe-asset.service';
import { RecipeDataService } from '../../recipe-explorer/services/recipe-data.service';
import { PokemonProfileService } from '../../../shared/pokemon-profile/pokemon-profile.service';
import { POKEMON_QUEST_MOVES } from '../data/moves.data';
import { POKEDEX_ENTRIES } from '../../pokedex/data/pokedex.data';
import { MOVE_ICON_BY_NAME } from '../utils/move-icon.util';

const STONE_ICON_BY_NAME: Record<string, string> = {
  'Broadburst Stone': 'broadburststone.png',
  'Scattershot Stone': 'scattershotstone.png',
  'Sharing Stone': 'sharingstone.png',
  'Stay Strong Stone': 'staystrongstone.png',
  'Wait Less Stone': 'waitlessstone.png',
  'Whack-Whack Stone': 'whack-whackstone.png'
};

type MovesFilterModalKind = 'type' | 'stone' | 'pokemon' | 'sort';
type MovesSortOption = 'default' | 'type' | 'wait' | 'power';

const SORT_OPTIONS: Array<{ value: MovesSortOption; label: string }> = [
  { value: 'default', label: 'Original Order' },
  { value: 'type', label: 'Type' },
  { value: 'wait', label: 'Wait' },
  { value: 'power', label: 'Power' }
];

@Component({
  selector: 'app-moves-page',
  imports: [CommonModule],
  templateUrl: './moves-page.component.html',
  styleUrl: './moves-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovesPageComponent {
  private readonly recipeDataService = inject(RecipeDataService);
  private readonly recipeAssetService = inject(RecipeAssetService);
  private readonly pokemonProfileService = inject(PokemonProfileService);

  private readonly _nameFilter = signal('');
  private readonly _selectedTypes = signal<string[]>([]);
  private readonly _selectedStones = signal<string[]>([]);
  private readonly _selectedPokemon = signal<string[]>([]);
  private readonly _sortBy = signal<MovesSortOption>('default');
  private readonly _modalKind = signal<MovesFilterModalKind | null>(null);
  private readonly _modalSelection = signal<string[]>([]);
  private readonly _modalSearch = signal('');

  readonly moves = POKEMON_QUEST_MOVES;
  readonly dataset = toSignal<RecipeDataset | null>(this.recipeDataService.dataset$, {
    initialValue: null
  });
  readonly nameFilter = this._nameFilter.asReadonly();
  readonly selectedTypes = this._selectedTypes.asReadonly();
  readonly selectedStones = this._selectedStones.asReadonly();
  readonly selectedPokemon = this._selectedPokemon.asReadonly();
  readonly sortOptions = SORT_OPTIONS;
  readonly sortBy = this._sortBy.asReadonly();
  readonly modalKind = this._modalKind.asReadonly();
  readonly modalSelection = this._modalSelection.asReadonly();
  readonly modalSearch = this._modalSearch.asReadonly();

  readonly pokemonNumberByName = new Map(POKEDEX_ENTRIES.map((entry) => [entry.name, entry.number]));

  readonly pokemonSpriteByName = computed(
    () => new Map((this.dataset()?.pokemonIndex ?? []).map((entry) => [entry.name, entry]))
  );

  readonly typeOptions = computed(() =>
    [...new Set(this.moves.map((move) => move.type))].sort((left, right) => left.localeCompare(right))
  );

  readonly stoneOptions = computed(() =>
    [...new Set(this.moves.flatMap((move) => move.stones))].sort((left, right) =>
      left.localeCompare(right)
    )
  );

  readonly pokemonOptions = computed(() =>
    [...new Set(this.moves.flatMap((move) => move.pokemon))].sort((left, right) =>
      left.localeCompare(right)
    )
  );

  readonly modalOptions = computed(() => {
    const pokemonSearch = this.modalSearch().trim().toLocaleLowerCase();

    switch (this.modalKind()) {
      case 'type':
        return this.typeOptions();
      case 'stone':
        return this.stoneOptions();
      case 'pokemon':
        return this.pokemonOptions().filter(
          (option) => !pokemonSearch || option.toLocaleLowerCase().includes(pokemonSearch)
        );
      case 'sort':
        return this.sortOptions.map((option) => option.value);
      default:
        return [];
    }
  });

  readonly filteredMoves = computed(() => {
    const moveName = this.nameFilter().trim().toLocaleLowerCase();
    const types = this.selectedTypes();
    const stones = this.selectedStones();
    const pokemon = this.selectedPokemon();
    const sortBy = this.sortBy();

    return this.moves
      .filter(
        (move) =>
          (!moveName || move.name.toLocaleLowerCase().includes(moveName)) &&
          (!types.length || types.includes(move.type)) &&
          (!stones.length || stones.some((stone) => move.stones.includes(stone))) &&
          (!pokemon.length || pokemon.some((entry) => move.pokemon.includes(entry)))
      )
      .slice()
      .sort((left, right) => this.compareMoves(left, right, sortBy));
  });

  readonly visiblePokemonCount = computed(
    () => new Set(this.filteredMoves().flatMap((move) => move.pokemon)).size
  );

  readonly hasActiveFilters = computed(
    () =>
      this.nameFilter().length > 0 ||
      this.selectedTypes().length > 0 ||
      this.selectedStones().length > 0 ||
      this.selectedPokemon().length > 0 ||
      this.sortBy() !== 'default'
  );

  updateNameFilter(value: string): void {
    this._nameFilter.set(value);
  }

  openSelector(kind: MovesFilterModalKind): void {
    this._modalKind.set(kind);
    this._modalSearch.set('');

    switch (kind) {
      case 'type':
        this._modalSelection.set([...this.selectedTypes()]);
        break;
      case 'stone':
        this._modalSelection.set([...this.selectedStones()]);
        break;
      case 'pokemon':
        this._modalSelection.set([...this.selectedPokemon()]);
        break;
      case 'sort':
        this._modalSelection.set([this.sortBy()]);
        break;
    }
  }

  closeSelector(): void {
    this._modalKind.set(null);
    this._modalSelection.set([]);
    this._modalSearch.set('');
  }

  updateModalSearch(value: string): void {
    this._modalSearch.set(value);
  }

  toggleModalOption(value: string): void {
    if (this.modalKind() === 'sort') {
      this._modalSelection.set([value]);
      return;
    }

    const current = this.modalSelection();

    if (current.includes(value)) {
      this._modalSelection.set(current.filter((entry) => entry !== value));
      return;
    }

    this._modalSelection.set([...current, value]);
  }

  saveSelector(): void {
    const selected = this.modalOptions().filter((option) => this.modalSelection().includes(option));

    switch (this.modalKind()) {
      case 'type':
        this._selectedTypes.set(selected);
        break;
      case 'stone':
        this._selectedStones.set(selected);
        break;
      case 'pokemon':
        this._selectedPokemon.set(selected);
        break;
      case 'sort': {
        const selectedSort = this.modalSelection()[0] as MovesSortOption | undefined;
        this._sortBy.set(selectedSort ?? 'default');
        break;
      }
    }

    this.closeSelector();
  }

  clearFilters(): void {
    this._nameFilter.set('');
    this._selectedTypes.set([]);
    this._selectedStones.set([]);
    this._selectedPokemon.set([]);
    this._sortBy.set('default');
    this.closeSelector();
  }

  isModalOptionSelected(value: string): boolean {
    return this.modalSelection().includes(value);
  }

  modalTitle(): string {
    switch (this.modalKind()) {
      case 'type':
        return 'Select types';
      case 'stone':
        return 'Select stones';
      case 'pokemon':
        return 'Select pokemon';
      case 'sort':
        return 'Select sorting';
      default:
        return 'Select filters';
    }
  }

  sortLabel(value: MovesSortOption): string {
    return this.sortOptions.find((option) => option.value === value)?.label ?? value;
  }

  modalOptionLabel(option: string): string {
    return this.modalKind() === 'sort' ? this.sortLabel(option as MovesSortOption) : option;
  }

  typeIconPath(typeName: string): string {
    return this.recipeAssetService.typeIconPath(typeName);
  }

  hasPokemonSprite(name: string): boolean {
    return this.pokemonSpriteByName().has(name);
  }

  pokemonSpriteStyle(name: string): Record<string, string> {
    return this.recipeAssetService.getPokemonSpriteStyle(
      name,
      this.dataset()?.pokemonIndex ?? [],
      this.pokemonSpriteByName(),
      this.dataset()?.sprites,
      40
    );
  }

  pokemonAvatarPath(name: string): string {
    const number = this.pokemonNumberByName.get(name);

    return this.recipeAssetService.pokemonAvatarPath(number ?? 1);
  }

  moveIconPath(name: string): string {
    return `assets/moves/${MOVE_ICON_BY_NAME[name]}`;
  }

  stoneIconPath(name: string): string {
    return `assets/stones/${STONE_ICON_BY_NAME[name]}`;
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByValue(_: number, value: string): string {
    return value;
  }

  openPokemonProfile(name: string): void {
    this.pokemonProfileService.open(name);
  }

  private compareMoves(
    left: (typeof this.moves)[number],
    right: (typeof this.moves)[number],
    sortBy: MovesSortOption
  ): number {
    switch (sortBy) {
      case 'type':
        return left.type.localeCompare(right.type) || left.name.localeCompare(right.name);
      case 'wait':
        return right.waitTime - left.waitTime || left.name.localeCompare(right.name);
      case 'power':
        return right.power - left.power || left.name.localeCompare(right.name);
      case 'default':
      default:
        return 0;
    }
  }
}
