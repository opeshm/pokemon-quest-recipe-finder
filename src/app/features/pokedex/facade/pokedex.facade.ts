import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokedexRepository } from '../../../core/data-access/pokedex.repository';
import { RECIPES_REPOSITORY, RecipesRepository } from '../../../core/data-access/recipes.repository';
import { LoadState } from '../../../core/models/load-state.model';
import { RecipeDataset } from '../../../core/models/recipe-dataset.model';
import { PokedexEntry, PokemonStyle } from '../models/pokedex.model';

export type PokedexFilterModalKind = 'style' | 'type' | 'sort';
export type PokedexSortOption = 'number' | 'hp' | 'atk' | 'type' | 'name';

export const POKEDEX_SORT_OPTIONS: Array<{ value: PokedexSortOption; label: string }> = [
  { value: 'number', label: 'Pokedex Number' },
  { value: 'hp', label: 'HP' },
  { value: 'atk', label: 'ATK' },
  { value: 'type', label: 'Type' },
  { value: 'name', label: 'Alphabetical' }
];

@Injectable()
export class PokedexFacade {
  private readonly recipesRepository = inject<RecipesRepository>(RECIPES_REPOSITORY);
  private readonly pokedexRepository = inject(PokedexRepository);

  private readonly _selectedStyles = signal<PokemonStyle[]>([]);
  private readonly _selectedTypes = signal<string[]>([]);
  private readonly _nameFilter = signal('');
  private readonly _sortBy = signal<PokedexSortOption>('number');
  private readonly _modalKind = signal<PokedexFilterModalKind | null>(null);
  private readonly _modalSelection = signal<string[]>([]);

  readonly entries = this.pokedexRepository.getAll();
  readonly styleOptions: PokemonStyle[] = ['Melee', 'Range'];
  readonly sortOptions = POKEDEX_SORT_OPTIONS;
  readonly dataset = toSignal(this.recipesRepository.dataset$, { initialValue: null });
  readonly loadState = toSignal(this.recipesRepository.loadState$, {
    initialValue: { status: 'loading' } as LoadState<RecipeDataset>
  });
  readonly selectedStyles = this._selectedStyles.asReadonly();
  readonly selectedTypes = this._selectedTypes.asReadonly();
  readonly nameFilter = this._nameFilter.asReadonly();
  readonly sortBy = this._sortBy.asReadonly();
  readonly modalKind = this._modalKind.asReadonly();
  readonly modalSelection = this._modalSelection.asReadonly();

  readonly pokemonSpriteByName = computed(
    () => new Map((this.dataset()?.pokemonIndex ?? []).map((entry) => [entry.name, entry]))
  );

  readonly typeOptions = computed(() =>
    [...new Set(this.entries.flatMap((entry) => entry.types))].sort((left, right) =>
      left.localeCompare(right)
    )
  );

  readonly modalOptions = computed(() => {
    switch (this.modalKind()) {
      case 'style':
        return [...this.styleOptions];
      case 'type':
        return this.typeOptions();
      case 'sort':
        return this.sortOptions.map((option) => option.value);
      default:
        return [];
    }
  });

  readonly filteredEntries = computed(() => {
    const styles = this.selectedStyles();
    const types = this.selectedTypes();
    const nameFilter = this.nameFilter().trim().toLocaleLowerCase();
    const sortBy = this.sortBy();

    return this.entries
      .filter(
        (entry) =>
          (!nameFilter || entry.name.toLocaleLowerCase().includes(nameFilter)) &&
          (!styles.length || styles.includes(entry.style)) &&
          (!types.length || types.some((type) => entry.types.includes(type)))
      )
      .slice()
      .sort((left, right) => this.compareEntries(left, right, sortBy));
  });

  readonly spriteWarning = computed(() =>
    this.loadState().status === 'error'
      ? 'Pokemon sprites are unavailable right now, but the full Pokedex is still available.'
      : null
  );

  readonly hasActiveFilters = computed(
    () =>
      this.nameFilter().length > 0 ||
      this.selectedStyles().length > 0 ||
      this.selectedTypes().length > 0 ||
      this.sortBy() !== 'number'
  );

  updateNameFilter(value: string): void {
    this._nameFilter.set(value);
  }

  openSelector(kind: PokedexFilterModalKind): void {
    this._modalKind.set(kind);

    switch (kind) {
      case 'style':
        this._modalSelection.set([...this.selectedStyles()]);
        break;
      case 'type':
        this._modalSelection.set([...this.selectedTypes()]);
        break;
      case 'sort':
        this._modalSelection.set([this.sortBy()]);
        break;
    }
  }

  closeSelector(): void {
    this._modalKind.set(null);
    this._modalSelection.set([]);
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
    switch (this.modalKind()) {
      case 'style':
        this._selectedStyles.set(
          this.styleOptions.filter((option) => this.modalSelection().includes(option))
        );
        break;
      case 'type':
        this._selectedTypes.set(
          this.typeOptions().filter((option) => this.modalSelection().includes(option))
        );
        break;
      case 'sort': {
        const selected = this.modalSelection()[0] as PokedexSortOption | undefined;
        this._sortBy.set(selected ?? 'number');
        break;
      }
    }

    this.closeSelector();
  }

  clearFilters(): void {
    this._nameFilter.set('');
    this._selectedStyles.set([]);
    this._selectedTypes.set([]);
    this._sortBy.set('number');
    this.closeSelector();
  }

  isModalOptionSelected(value: string): boolean {
    return this.modalSelection().includes(value);
  }

  modalTitle(): string {
    switch (this.modalKind()) {
      case 'style':
        return 'Select styles';
      case 'type':
        return 'Select types';
      case 'sort':
        return 'Select sorting';
      default:
        return 'Select filters';
    }
  }

  sortLabel(value: PokedexSortOption): string {
    return this.sortOptions.find((option) => option.value === value)?.label ?? value;
  }

  modalOptionLabel(option: string): string {
    return this.modalKind() === 'sort' ? this.sortLabel(option as PokedexSortOption) : option;
  }

  trackByNumber(_: number, entry: PokedexEntry): number {
    return entry.number;
  }

  private compareEntries(
    left: PokedexEntry,
    right: PokedexEntry,
    sortBy: PokedexSortOption
  ): number {
    switch (sortBy) {
      case 'hp':
        return right.baseHp - left.baseHp || left.number - right.number;
      case 'atk':
        return right.baseAtk - left.baseAtk || left.number - right.number;
      case 'type': {
        const leftType = left.types.join(', ');
        const rightType = right.types.join(', ');
        return leftType.localeCompare(rightType) || left.number - right.number;
      }
      case 'name':
        return left.name.localeCompare(right.name) || left.number - right.number;
      case 'number':
      default:
        return left.number - right.number;
    }
  }
}
