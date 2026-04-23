import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IngredientConfiguration, PokemonProfileTrigger, RecipeAssetBindings, RecipeDetailPanelViewModel } from '../../models/recipe-view.model';

@Component({
  selector: 'app-recipe-detail-panel',
  imports: [CommonModule],
  templateUrl: './recipe-detail-panel.component.html',
  styleUrl: './recipe-detail-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailPanelComponent {
  readonly vm = input.required<RecipeDetailPanelViewModel>();
  readonly assets = input.required<Pick<RecipeAssetBindings, 'getDishSpriteStyle' | 'getPokemonSpriteStyle' | 'ingredientIconPath' | 'ingredientLabel'>>();
  readonly pokemonProfile = input.required<PokemonProfileTrigger>();

  variantSummary(variant: IngredientConfiguration): string {
    return variant.ingredients.map((item) => `${item.quantity}x ${item.name}`).join(', ');
  }

  getRateFill(rate: number): number {
    const max = this.vm().maxAttractRate;
    if (max <= 0) {
      return 0;
    }

    return Math.max(0, Math.min(1, rate / max));
  }
}
