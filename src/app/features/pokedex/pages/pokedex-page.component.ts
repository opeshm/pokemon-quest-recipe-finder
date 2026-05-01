import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeAssetService } from '../../../core/assets/recipe-asset.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { PokemonProfileService } from '../../../shared/pokemon-profile/pokemon-profile.service';
import { FilterSelectorModalComponent } from '../../../shared/ui/filter-selector-modal/filter-selector-modal.component';
import { PokedexFacade, PokedexSortOption } from '../facade/pokedex.facade';
import { PokedexEntry } from '../models/pokedex.model';

@Component({
  selector: 'app-pokedex-page',
  imports: [CommonModule, FilterSelectorModalComponent, TranslatePipe],
  templateUrl: './pokedex-page.component.html',
  styleUrl: './pokedex-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PokedexFacade]
})
export class PokedexPageComponent {
  readonly facade = inject(PokedexFacade);

  private readonly recipeAssetService = inject(RecipeAssetService);
  private readonly pokemonProfileService = inject(PokemonProfileService);

  readonly entries = this.facade.entries;
  readonly styleOptions = this.facade.styleOptions;
  readonly sortOptions = this.facade.sortOptions;
  readonly dataset = this.facade.dataset;
  readonly loadState = this.facade.loadState;
  readonly selectedStyles = this.facade.selectedStyles;
  readonly selectedTypes = this.facade.selectedTypes;
  readonly nameFilter = this.facade.nameFilter;
  readonly sortBy = this.facade.sortBy;
  readonly modalKind = this.facade.modalKind;
  readonly modalSelection = this.facade.modalSelection;
  readonly pokemonSpriteByName = this.facade.pokemonSpriteByName;
  readonly modalOptions = this.facade.modalOptions;
  readonly filteredEntries = this.facade.filteredEntries;
  readonly spriteWarning = this.facade.spriteWarning;
  readonly hasActiveFilters = this.facade.hasActiveFilters;

  updateNameFilter(value: string): void {
    this.facade.updateNameFilter(value);
  }

  openSelector(kind: 'style' | 'type' | 'sort'): void {
    this.facade.openSelector(kind);
  }

  closeSelector(): void {
    this.facade.closeSelector();
  }

  toggleModalOption(value: string): void {
    this.facade.toggleModalOption(value);
  }

  saveSelector(): void {
    this.facade.saveSelector();
  }

  clearFilters(): void {
    this.facade.clearFilters();
  }

  isModalOptionSelected(value: string): boolean {
    return this.facade.isModalOptionSelected(value);
  }

  modalTitle(): string {
    return this.facade.modalTitle();
  }

  sortLabel(value: PokedexSortOption): string {
    return this.facade.sortLabel(value);
  }

  modalOptionLabel(option: string): string {
    return this.facade.modalOptionLabel(option);
  }

  modalLeadingImageSrc(option: string): string | null {
    return this.modalKind() === 'type' ? this.typeIconPath(option) : null;
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
    return this.facade.trackByNumber(0, entry);
  }

  openPokemonProfile(name: string): void {
    this.pokemonProfileService.open(name);
  }
}
