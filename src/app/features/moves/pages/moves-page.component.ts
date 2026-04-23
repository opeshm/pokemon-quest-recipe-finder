import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeAssetService } from '../../../core/assets/recipe-asset.service';
import { PokemonProfileService } from '../../../shared/pokemon-profile/pokemon-profile.service';
import { FilterSelectorModalComponent } from '../../../shared/ui/filter-selector-modal/filter-selector-modal.component';
import { MovesFacade, MovesSortOption } from '../facade/moves.facade';
import { MOVE_ICON_BY_NAME } from '../utils/move-icon.util';

const STONE_ICON_BY_NAME: Record<string, string> = {
  'Broadburst Stone': 'broadburststone.png',
  'Scattershot Stone': 'scattershotstone.png',
  'Sharing Stone': 'sharingstone.png',
  'Stay Strong Stone': 'staystrongstone.png',
  'Wait Less Stone': 'waitlessstone.png',
  'Whack-Whack Stone': 'whack-whackstone.png'
};

@Component({
  selector: 'app-moves-page',
  imports: [CommonModule, FilterSelectorModalComponent],
  templateUrl: './moves-page.component.html',
  styleUrl: './moves-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MovesFacade]
})
export class MovesPageComponent {
  readonly facade = inject(MovesFacade);

  private readonly recipeAssetService = inject(RecipeAssetService);
  private readonly pokemonProfileService = inject(PokemonProfileService);

  readonly moves = this.facade.moves;
  readonly dataset = this.facade.dataset;
  readonly nameFilter = this.facade.nameFilter;
  readonly selectedTypes = this.facade.selectedTypes;
  readonly selectedStones = this.facade.selectedStones;
  readonly selectedPokemon = this.facade.selectedPokemon;
  readonly sortOptions = this.facade.sortOptions;
  readonly sortBy = this.facade.sortBy;
  readonly modalKind = this.facade.modalKind;
  readonly modalSelection = this.facade.modalSelection;
  readonly modalSearch = this.facade.modalSearch;
  readonly pokemonSpriteByName = this.facade.pokemonSpriteByName;
  readonly modalOptions = this.facade.modalOptions;
  readonly filteredMoves = this.facade.filteredMoves;
  readonly visiblePokemonCount = this.facade.visiblePokemonCount;
  readonly hasActiveFilters = this.facade.hasActiveFilters;

  updateNameFilter(value: string): void {
    this.facade.updateNameFilter(value);
  }

  openSelector(kind: 'type' | 'stone' | 'pokemon' | 'sort'): void {
    this.facade.openSelector(kind);
  }

  closeSelector(): void {
    this.facade.closeSelector();
  }

  updateModalSearch(value: string): void {
    this.facade.updateModalSearch(value);
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

  sortLabel(value: MovesSortOption): string {
    return this.facade.sortLabel(value);
  }

  modalOptionLabel(option: string): string {
    return this.facade.modalOptionLabel(option);
  }

  modalLeadingImageSrc(option: string): string | null {
    switch (this.modalKind()) {
      case 'type':
        return this.typeIconPath(option);
      case 'stone':
        return this.stoneIconPath(option);
      case 'pokemon':
        return this.hasPokemonSprite(option) ? null : this.pokemonAvatarPath(option);
      default:
        return null;
    }
  }

  modalLeadingImageAlt(option: string): string {
    return this.modalKind() === 'sort' ? '' : option;
  }

  modalLeadingSpriteStyle(option: string): Record<string, string> | null {
    return this.modalKind() === 'pokemon' && this.hasPokemonSprite(option)
      ? this.pokemonSpriteStyle(option)
      : null;
  }

  modalLeadingImageWidth(): number {
    switch (this.modalKind()) {
      case 'type':
        return 28;
      case 'stone':
      case 'pokemon':
        return 32;
      default:
        return 0;
    }
  }

  modalLeadingImageHeight(): number {
    return this.modalLeadingImageWidth();
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
    const number = this.facade.pokemonNumberByName.get(name);

    return this.recipeAssetService.pokemonAvatarPath(number ?? 1);
  }

  moveIconPath(name: string): string {
    return `assets/moves/${MOVE_ICON_BY_NAME[name]}`;
  }

  stoneIconPath(name: string): string {
    return `assets/stones/${STONE_ICON_BY_NAME[name]}`;
  }

  trackByMove(_: number, move: (typeof this.moves)[number]): string {
    return `${move.name}|${move.type}|${move.waitTime}|${move.power}`;
  }

  trackByValue(_: number, value: string): string {
    return value;
  }

  openPokemonProfile(name: string): void {
    this.pokemonProfileService.open(name);
  }
}
