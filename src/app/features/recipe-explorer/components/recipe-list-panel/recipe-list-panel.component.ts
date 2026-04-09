import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RecipeAssetBindings, RecipeListPanelViewModel } from '../../models/recipe-view.model';

@Component({
  selector: 'app-recipe-list-panel',
  imports: [CommonModule],
  templateUrl: './recipe-list-panel.component.html',
  styleUrl: './recipe-list-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListPanelComponent {
  readonly vm = input.required<RecipeListPanelViewModel>();
  readonly assets = input.required<Pick<RecipeAssetBindings, 'getDishSpriteStyle' | 'getPokemonSpriteStyle' | 'ingredientIconPath' | 'ingredientLabel'>>();

  readonly selectedRecipeIdChange = output<string>();

  selectRecipe(recipeId: string): void {
    this.selectedRecipeIdChange.emit(recipeId);
  }
}
