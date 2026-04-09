import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltersPanelViewModel, RecipeAssetBindings } from '../../models/recipe-view.model';

@Component({
  selector: 'app-filters-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters-panel.component.html',
  styleUrl: './filters-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersPanelComponent {
  readonly vm = input.required<FiltersPanelViewModel>();
  readonly assets = input.required<Pick<RecipeAssetBindings, 'ingredientIconPath' | 'typeIconPath' | 'getPokemonSpriteStyle'>>();

  readonly searchTermChange = output<string>();
  readonly selectedQualityChange = output<string>();
  readonly selectedTypeChange = output<string>();
  readonly selectedPokemonChange = output<string>();
  readonly pokemonFilterQueryChange = output<string>();

  readonly clearFilters = output<void>();
  readonly clearInventory = output<void>();
  readonly toggleInventoryIngredient = output<string>();

  onToggleQuality(quality: string): void {
    this.selectedQualityChange.emit(this.vm().selectedQuality === quality ? '' : quality);
  }

  onToggleType(typeName: string): void {
    this.selectedTypeChange.emit(this.vm().selectedType === typeName ? '' : typeName);
  }

  onTogglePokemon(name: string): void {
    this.selectedPokemonChange.emit(this.vm().selectedPokemon === name ? '' : name);
  }

  isInventoryIngredientSelected(code: string): boolean {
    return this.vm().selectedInventory.has(code);
  }
}
