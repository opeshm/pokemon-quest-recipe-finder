import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltersPanelViewModel, PokemonProfileTrigger, RecipeAssetBindings } from '../../models/recipe-view.model';

type RecipeFilterModalKind = 'quality' | 'type' | 'pokemon' | 'inventory';

@Component({
  selector: 'app-filters-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters-panel.component.html',
  styleUrl: './filters-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersPanelComponent {
  readonly vm = input.required<FiltersPanelViewModel>();
  readonly assets = input.required<
    Pick<RecipeAssetBindings, 'ingredientIconPath' | 'typeIconPath' | 'getPokemonSpriteStyle'>
  >();
  readonly pokemonProfile = input.required<PokemonProfileTrigger>();

  readonly searchTermChange = output<string>();
  readonly selectedQualitiesChange = output<string[]>();
  readonly selectedTypesChange = output<string[]>();
  readonly selectedPokemonChange = output<string[]>();
  readonly selectedInventoryChange = output<string[]>();
  readonly clearFilters = output<void>();

  modalKind: RecipeFilterModalKind | null = null;
  modalSelection: string[] = [];
  modalSearch = '';

  openSelector(kind: RecipeFilterModalKind): void {
    this.modalKind = kind;
    this.modalSearch = '';

    switch (kind) {
      case 'quality':
        this.modalSelection = [...this.vm().selectedQualities];
        break;
      case 'type':
        this.modalSelection = [...this.vm().selectedTypes];
        break;
      case 'pokemon':
        this.modalSelection = [...this.vm().selectedPokemon];
        break;
      case 'inventory':
        this.modalSelection = [...this.vm().selectedInventory];
        break;
    }
  }

  closeSelector(): void {
    this.modalKind = null;
    this.modalSelection = [];
    this.modalSearch = '';
  }

  toggleModalOption(value: string): void {
    if (this.modalSelection.includes(value)) {
      this.modalSelection = this.modalSelection.filter((entry) => entry !== value);
      return;
    }

    this.modalSelection = [...this.modalSelection, value];
  }

  saveSelector(): void {
    switch (this.modalKind) {
      case 'quality':
        this.selectedQualitiesChange.emit(
          this.vm().qualityOptions.filter((option) => this.modalSelection.includes(option))
        );
        break;
      case 'type':
        this.selectedTypesChange.emit(
          this.vm().typeOptions.filter((option) => this.modalSelection.includes(option))
        );
        break;
      case 'pokemon':
        this.selectedPokemonChange.emit(
          this.vm().pokemonOptions.filter((option) => this.modalSelection.includes(option))
        );
        break;
      case 'inventory':
        this.selectedInventoryChange.emit(
          this.vm().ingredients
            .map((ingredient) => ingredient.code)
            .filter((option) => this.modalSelection.includes(option))
        );
        break;
    }

    this.closeSelector();
  }

  updateModalSearch(value: string): void {
    this.modalSearch = value;
  }

  isModalOptionSelected(value: string): boolean {
    return this.modalSelection.includes(value);
  }

  modalTitle(): string {
    switch (this.modalKind) {
      case 'quality':
        return 'Select qualities';
      case 'type':
        return 'Select types';
      case 'pokemon':
        return 'Select pokemon';
      case 'inventory':
        return 'Select ingredients';
      default:
        return 'Select filters';
    }
  }

  modalOptions(): string[] {
    const search = this.modalSearch.trim().toLocaleLowerCase();

    switch (this.modalKind) {
      case 'quality':
        return [...this.vm().qualityOptions];
      case 'type':
        return this.vm().typeOptions;
      case 'pokemon':
        return this.vm().pokemonOptions.filter(
          (option) => !search || option.toLocaleLowerCase().includes(search)
        );
      case 'inventory':
        return this.vm().ingredients
          .filter((ingredient) => !search || ingredient.name.toLocaleLowerCase().includes(search))
          .map((ingredient) => ingredient.code);
      default:
        return [];
    }
  }

  ingredientName(code: string): string {
    return this.vm().ingredients.find((ingredient) => ingredient.code === code)?.name ?? code;
  }
}
