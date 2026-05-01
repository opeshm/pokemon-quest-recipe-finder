import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RecipeDataset } from '../../../../core/models/recipe-dataset.model';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  readonly dataset = input<RecipeDataset | null>(null);
}
