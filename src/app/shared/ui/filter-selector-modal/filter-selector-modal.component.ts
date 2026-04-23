import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-filter-selector-modal',
  imports: [CommonModule],
  templateUrl: './filter-selector-modal.component.html',
  styleUrl: './filter-selector-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSelectorModalComponent {
  readonly title = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly options = input.required<string[]>();
  readonly isOptionSelected = input.required<(option: string) => boolean>();
  readonly optionLabel = input.required<(option: string) => string>();
  readonly leadingImageSrc = input<(option: string) => string | null>(() => null);
  readonly leadingImageAlt = input<(option: string) => string>(() => '');
  readonly leadingSpriteStyle = input<(option: string) => Record<string, string> | null>(() => null);
  readonly leadingImageWidth = input(0);
  readonly leadingImageHeight = input(0);
  readonly showSearch = input(false);
  readonly searchValue = input('');
  readonly searchLabel = input('Search pokemon');
  readonly searchPlaceholder = input('Find a pokemon');

  readonly close = output<void>();
  readonly searchValueChange = output<string>();
  readonly optionToggle = output<string>();
  readonly save = output<void>();

  onSearchInput(value: string): void {
    this.searchValueChange.emit(value);
  }

  trackByValue(_: number, value: string): string {
    return value;
  }
}
