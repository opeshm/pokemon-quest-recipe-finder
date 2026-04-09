import { TestBed } from '@angular/core/testing';
import { FiltersPanelComponent } from './filters-panel.component';

describe('FiltersPanelComponent', () => {
  it('renders filter view model data and emits interaction events', async () => {
    const fixture = TestBed.createComponent(FiltersPanelComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('vm', {
      searchTerm: 'stew',
      selectedQuality: 'Special',
      selectedPokemon: 'Bulbasaur',
      selectedType: 'Misc',
      pokemonFilterQuery: 'bulb',
      qualityOptions: ['Special', 'Good'],
      typeOptions: ['Misc'],
      visiblePokemonOptions: ['Bulbasaur'],
      ingredients: [{ code: 'bm', name: 'Balm Mushroom' }],
      hasInventoryFilter: true,
      selectedInventory: new Set(['bm'])
    });
    fixture.componentRef.setInput('assets', {
      ingredientIconPath: (code: string) => `assets/ingredients/${code}.png`,
      typeIconPath: (typeName: string) => `assets/types/${typeName}.png`,
      getPokemonSpriteStyle: () => ({ width: '24px', height: '24px' })
    });

    const selectedQualityChangeSpy = vi.fn();
    const clearInventorySpy = vi.fn();
    component.selectedQualityChange.subscribe(selectedQualityChangeSpy);
    component.clearInventory.subscribe(clearInventorySpy);

    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="search"]')?.getAttribute('placeholder')).toContain('Dish');

    const qualityButton = [...compiled.querySelectorAll('.pill-toggle')].find((button) =>
      button.textContent?.includes('Special')
    ) as HTMLButtonElement;
    qualityButton.click();

    const clearInventoryButton = compiled.querySelector('.clear-mini-button') as HTMLButtonElement;
    clearInventoryButton.click();

    expect(selectedQualityChangeSpy).toHaveBeenCalledWith('');
    expect(clearInventorySpy).toHaveBeenCalled();
  });
});
