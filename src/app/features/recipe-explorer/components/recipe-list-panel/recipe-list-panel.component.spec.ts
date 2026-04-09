import { TestBed } from '@angular/core/testing';
import { RecipeListPanelComponent } from './recipe-list-panel.component';

describe('RecipeListPanelComponent', () => {
  it('renders recipe cards and emits recipe selection', () => {
    const fixture = TestBed.createComponent(RecipeListPanelComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('vm', {
      selectedRecipeId: 'recipe-1',
      cards: [
        {
          recipe: {
            id: 'recipe-1',
            recipeName: 'Mulligan Stew a la Cube',
            dishName: 'Mulligan Stew a la Cube',
            dishSlug: 'mulligan-stew-a-la-cube',
            typeName: 'Misc',
            quality: 'Special',
            qualityTier: 4,
            pokemonResults: [{ name: 'Bulbasaur', attractRate: 66.66 }],
            source: { page: 'https://example.com', extractionType: 'test' },
            variants: [
              {
                id: 'variant-1',
                ingredients: [{ code: 'bm', name: 'Balm Mushroom', quantity: 5 }],
                ingredientPattern: ['bm', 'bm', 'bm', 'bm', 'bm']
              }
            ]
          },
          ingredientSummary: '5x Balm Mushroom',
          firstVariant: {
            id: 'variant-1',
            ingredients: [{ code: 'bm', name: 'Balm Mushroom', quantity: 5 }],
            ingredientPattern: ['bm', 'bm', 'bm', 'bm', 'bm']
          },
          visibleVariantCount: 1
        }
      ]
    });
    fixture.componentRef.setInput('assets', {
      getDishSpriteStyle: () => ({ width: '110px', height: '69px' }),
      getPokemonSpriteStyle: () => ({ width: '24px', height: '24px' }),
      ingredientIconPath: (code: string) => `assets/ingredients/${code}.png`,
      ingredientLabel: () => 'Balm Mushroom'
    });

    const selectionSpy = vi.fn();
    component.selectedRecipeIdChange.subscribe(selectionSpy);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.recipe-list strong')?.textContent).toContain('Mulligan Stew a la Cube');

    (compiled.querySelector('.recipe-list button') as HTMLButtonElement).click();
    expect(selectionSpy).toHaveBeenCalledWith('recipe-1');
  });
});
