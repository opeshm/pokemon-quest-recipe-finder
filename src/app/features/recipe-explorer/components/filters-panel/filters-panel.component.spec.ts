import { TestBed } from '@angular/core/testing';
import { FiltersPanelComponent } from './filters-panel.component';

describe('FiltersPanelComponent', () => {
  it('renders filter view model data and emits interaction events', async () => {
    const fixture = TestBed.createComponent(FiltersPanelComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('vm', {
      searchTerm: 'stew',
      selectedQualities: ['Special'],
      selectedPokemon: ['Bulbasaur'],
      selectedTypes: ['Misc'],
      qualityOptions: ['Special', 'Good'],
      typeOptions: ['Misc'],
      pokemonOptions: ['Bulbasaur'],
      ingredients: [{ code: 'bm', name: 'Balm Mushroom' }],
      hasInventoryFilter: true,
      selectedInventory: new Set(['bm'])
    });
    fixture.componentRef.setInput('assets', {
      ingredientIconPath: (code: string) => `assets/ingredients/${code}.png`,
      typeIconPath: (typeName: string) => `assets/types/${typeName}.png`,
      getPokemonSpriteStyle: () => ({ width: '24px', height: '24px' })
    });

    const selectedQualitiesChangeSpy = vi.fn();
    component.selectedQualitiesChange.subscribe(selectedQualitiesChangeSpy);

    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="search"]')?.getAttribute('placeholder')).toContain('Dish');

    findButton(compiled, '.selector-trigger', 'Add Quality').click();
    fixture.detectChanges();

    findButton(compiled, '.modal-option', 'Special').click();
    fixture.detectChanges();

    findButton(compiled, '.selector-modal-button--primary', 'Save selection').click();
    fixture.detectChanges();

    expect(selectedQualitiesChangeSpy).toHaveBeenCalledWith([]);
  });

  it('filters pokemon modal options by search and emits saved selection', async () => {
    const fixture = TestBed.createComponent(FiltersPanelComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('vm', {
      searchTerm: '',
      selectedQualities: [],
      selectedPokemon: [],
      selectedTypes: [],
      qualityOptions: ['Special', 'Good'],
      typeOptions: ['Misc'],
      pokemonOptions: ['Bulbasaur', 'Charmander'],
      ingredients: [{ code: 'bm', name: 'Balm Mushroom' }],
      hasInventoryFilter: false,
      selectedInventory: new Set<string>()
    });
    fixture.componentRef.setInput('assets', {
      ingredientIconPath: (code: string) => `assets/ingredients/${code}.png`,
      typeIconPath: (typeName: string) => `assets/types/${typeName}.png`,
      getPokemonSpriteStyle: () => ({ width: '24px', height: '24px' })
    });

    const selectedPokemonChangeSpy = vi.fn();
    component.selectedPokemonChange.subscribe(selectedPokemonChangeSpy);

    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    findButton(compiled, '.selector-trigger', 'Add Pokemon').click();
    fixture.detectChanges();

    const modalSearch = compiled.querySelector('.modal-search-field input') as HTMLInputElement;
    modalSearch.value = 'char';
    modalSearch.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const options = Array.from(compiled.querySelectorAll('.modal-option')).map((option) =>
      option.textContent?.replace(/\s+/g, ' ').trim()
    );

    expect(options).toContain('Charmander');
    expect(options).not.toContain('Bulbasaur');

    findButton(compiled, '.modal-option', 'Charmander').click();
    fixture.detectChanges();

    findButton(compiled, '.selector-modal-button--primary', 'Save selection').click();
    fixture.detectChanges();

    expect(selectedPokemonChangeSpy).toHaveBeenCalledWith(['Charmander']);
  });
});

function findButton(root: HTMLElement, selector: string, text: string): HTMLButtonElement {
  const button = Array.from(root.querySelectorAll(selector)).find(
    (element) => element.textContent?.replace(/\s+/g, ' ').trim().includes(text)
  );

  expect(button).toBeTruthy();

  return button as HTMLButtonElement;
}
