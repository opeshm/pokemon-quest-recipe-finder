import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovesRepository } from '../../../core/data-access/moves.repository';
import { PokedexRepository } from '../../../core/data-access/pokedex.repository';
import { RECIPES_REPOSITORY, RecipesRepository } from '../../../core/data-access/recipes.repository';
import { RecipeDataset } from '../../../core/models/recipe-dataset.model';

export type MovesFilterModalKind = 'type' | 'stone' | 'pokemon' | 'sort';
export type MovesSortOption = 'default' | 'type' | 'wait' | 'power';

export const MOVES_SORT_OPTIONS: Array<{ value: MovesSortOption; label: string }> = [
  { value: 'default', label: 'Original Order' },
  { value: 'type', label: 'Type' },
  { value: 'wait', label: 'Wait' },
  { value: 'power', label: 'Power' }
];

@Injectable()
export class MovesFacade {
  private readonly recipesRepository = inject<RecipesRepository>(RECIPES_REPOSITORY);
  private readonly movesRepository = inject(MovesRepository);
  private readonly pokedexRepository = inject(PokedexRepository);

  private readonly _nameFilter = signal('');
  private readonly _selectedTypes = signal<string[]>([]);
  private readonly _selectedStones = signal<string[]>([]);
  private readonly _selectedPokemon = signal<string[]>([]);
  private readonly _sortBy = signal<MovesSortOption>('default');
  private readonly _modalKind = signal<MovesFilterModalKind | null>(null);
  private readonly _modalSelection = signal<string[]>([]);
  private readonly _modalSearch = signal('');

  readonly moves = this.movesRepository.getAll();
  readonly dataset = toSignal<RecipeDataset | null>(this.recipesRepository.dataset$, {
    initialValue: null
  });
  readonly nameFilter = this._nameFilter.asReadonly();
  readonly selectedTypes = this._selectedTypes.asReadonly();
  readonly selectedStones = this._selectedStones.asReadonly();
  readonly selectedPokemon = this._selectedPokemon.asReadonly();
  readonly sortOptions = MOVES_SORT_OPTIONS;
  readonly sortBy = this._sortBy.asReadonly();
  readonly modalKind = this._modalKind.asReadonly();
  readonly modalSelection = this._modalSelection.asReadonly();
  readonly modalSearch = this._modalSearch.asReadonly();

  readonly pokemonNumberByName = new Map(this.pokedexRepository.getAll().map((entry) => [entry.name, entry.number]));

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
