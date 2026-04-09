import { TestBed } from '@angular/core/testing';
import { RecipeDetailPanelComponent } from './recipe-detail-panel.component';

describe('RecipeDetailPanelComponent', () => {
  it('renders selected recipe details and computes rate fill', () => {
    const fixture = TestBed.createComponent(RecipeDetailPanelComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('vm', {
      maxAttractRate: 80,
      selectedRecipeView: {
        recipe: {
          id: 'recipe-1',
          recipeName: 'Honey Nectar a la Cube',
          dishName: 'Honey Nectar a la Cube',
          dishSlug: 'honey-nectar-a-la-cube',
          typeName: 'Yellow',
          quality: 'Good',
          qualityTier: 2,
          pokemonResults: [{ name: 'Eevee', attractRate: 80 }],
          source: { page: 'https://example.com', extractionType: 'test' },
          variants: [
            {
              id: 'variant-1',
              ingredients: [{ code: 'hn', name: 'Honey', quantity: 5 }],
              ingredientPattern: ['hn', 'hn', 'hn', 'hn', 'hn']
            }
          ]
        },
        visibleVariants: [
          {
            id: 'variant-1',
            ingredients: [{ code: 'hn', name: 'Honey', quantity: 5 }],
            ingredientPattern: ['hn', 'hn', 'hn', 'hn', 'hn']
          }
        ],
        visibleVariantCount: 1,
        hiddenVariantCount: 0
      }
    });
    fixture.componentRef.setInput('assets', {
      getDishSpriteStyle: () => ({ width: '170px', height: '108px' }),
      getPokemonSpriteStyle: () => ({ width: '36px', height: '36px' }),
      ingredientIconPath: (code: string) => `assets/ingredients/${code}.png`,
      ingredientLabel: () => 'Honey'
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Honey Nectar a la Cube');
    expect(component.getRateFill(40)).toBe(0.5);
  });
});
