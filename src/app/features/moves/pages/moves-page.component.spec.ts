import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RECIPES_REPOSITORY } from '../../../core/data-access/recipes.repository';
import { LoadState } from '../../../core/models/load-state.model';
import { RecipeDataset } from '../../../core/models/recipe-dataset.model';
import { PokemonProfileService } from '../../../shared/pokemon-profile/pokemon-profile.service';
import { MovesPageComponent } from './moves-page.component';

const mockDataset = {
  metadata: {
    title: 'Pokemon Quest Recipe Finder Dataset',
    source: 'https://pokequestrecipes.me',
    generatedAt: '2026-03-30T00:00:00.000Z',
    totalRecipes: 1,
    totalDishes: 1,
    totalPokemon: 151,
    scannedPages: 1,
    rateLimitMs: 250
  },
  ingredients: [],
  sprites: {
    file: 'assets/pokemon-assets.png',
    columns: 10,
    cellSizePx: 260,
    iconSizePx: 256,
    borderPx: 4
  },
  dishSprites: {
    file: 'assets/recipes-assets.png',
    columns: 4,
    rows: 5,
    cellWidthPx: 203,
    cellHeightPx: 130,
    iconWidthPx: 199,
    iconHeightPx: 126,
    borderPx: 4
  },
  pokemonIndex: [
    { id: 19, name: 'Rattata', spriteCol: 8, spriteRow: 1 },
    { id: 20, name: 'Raticate', spriteCol: 9, spriteRow: 1 },
    { id: 24, name: 'Arbok', spriteCol: 3, spriteRow: 2 }
  ],
  dishIndex: [],
  recipes: []
};

describe('MovesPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovesPageComponent],
      providers: [
        {
          provide: RECIPES_REPOSITORY,
          useValue: {
            dataset$: of(mockDataset),
            loadState$: of({ status: 'success', data: mockDataset } as LoadState<RecipeDataset>),
            reload: vi.fn()
          }
        }
      ]
    }).compileComponents();
  });

  it('renders the full Pokemon Quest move list with unique move rows', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const moveTitles = Array.from(compiled.querySelectorAll('.move-card h2')).map((heading) =>
      heading.textContent?.trim()
    );

    expect(compiled.querySelector('h1')?.textContent).toContain('All Pokemon Quest moves');
    expect(compiled.querySelectorAll('.move-card')).toHaveLength(167);
    expect(moveTitles.filter((title) => title === 'Transform')).toHaveLength(1);
    expect((compiled.querySelector('.move-icon') as HTMLImageElement)?.src).toContain(
      'assets/moves/acidarmor.png'
    );
    expect((compiled.querySelector('.pokemon-avatar-chip') as HTMLElement)?.title).toBe('Grimer');
    expect((compiled.querySelector('.stone-icon') as HTMLImageElement)?.src).toContain(
      'assets/stones/sharingstone.png'
    );
  });

  it('filters moves by name, type, stone, and Pokemon', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nameInput = compiled.querySelector('input[type="search"]') as HTMLInputElement;

    nameInput.value = 'bolt';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    openSelector(compiled, fixture, 'Add Type');
    toggleModalOption(compiled, fixture, 'Electric');
    saveModal(compiled, fixture);

    openSelector(compiled, fixture, 'Add Stone');
    toggleModalOption(compiled, fixture, 'Stay Strong Stone');
    saveModal(compiled, fixture);

    openSelector(compiled, fixture, 'Add Pokemon');
    toggleModalOption(compiled, fixture, 'Mewtwo');
    saveModal(compiled, fixture);

    fixture.detectChanges();

    const visibleMoves = Array.from(compiled.querySelectorAll('.move-card h2')).map((heading) =>
      heading.textContent?.trim()
    );

    expect(visibleMoves).toEqual(['Thunderbolt']);
  });

  it('sorts the filtered move list by the selected ordering option', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    openSelector(compiled, fixture, 'Change Sort');
    toggleModalOption(compiled, fixture, 'Power');
    saveModal(compiled, fixture);

    const firstMove = compiled.querySelector('.move-card h2')?.textContent?.trim();
    const sortChip = compiled.querySelector('.selector-box--sort .selected-text-chip')?.textContent?.trim();

    expect(firstMove).toBe('Explosion');
    expect(sortChip).toBe('Power');
  });

  it('clears all active filters', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nameInput = compiled.querySelector('input[type="search"]') as HTMLInputElement;
    const clearButton = compiled.querySelector('.clear-button') as HTMLButtonElement;

    nameInput.value = 'transform';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    openSelector(compiled, fixture, 'Add Type');
    toggleModalOption(compiled, fixture, 'Psychic');
    saveModal(compiled, fixture);

    openSelector(compiled, fixture, 'Change Sort');
    toggleModalOption(compiled, fixture, 'Wait');
    saveModal(compiled, fixture);

    clearButton.click();
    fixture.detectChanges();

    expect(nameInput.value).toBe('');
    expect(compiled.querySelectorAll('.move-card')).toHaveLength(167);
    expect(compiled.querySelectorAll('.selected-icon-chip')).toHaveLength(0);
    expect(compiled.querySelector('.selector-box--sort .selected-text-chip')?.textContent?.trim()).toBe(
      'Original Order'
    );
  });

  it('shows saved selections as icons inside the selector boxes', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    openSelector(compiled, fixture, 'Add Type');
    toggleModalOption(compiled, fixture, 'Electric');
    saveModal(compiled, fixture);

    openSelector(compiled, fixture, 'Add Stone');
    toggleModalOption(compiled, fixture, 'Wait Less Stone');
    saveModal(compiled, fixture);

    openSelector(compiled, fixture, 'Add Pokemon');
    toggleModalOption(compiled, fixture, 'Arbok');
    saveModal(compiled, fixture);

    const selectedType = compiled.querySelector('.selector-box--type .selected-icon-chip') as HTMLElement;
    const selectedStone = compiled.querySelector(
      '.selector-box--stone .selected-icon-chip'
    ) as HTMLElement;
    const selectedPokemon = compiled.querySelector(
      '.selector-box--pokemon .selected-icon-chip'
    ) as HTMLElement;

    expect(selectedType.title).toBe('Electric');
    expect(selectedType.querySelector('img')?.getAttribute('src')).toContain('assets/types/electric');
    expect(selectedStone.title).toBe('Wait Less Stone');
    expect(selectedStone.querySelector('img')?.getAttribute('src')).toContain(
      'assets/stones/waitlessstone.png'
    );
    expect(selectedPokemon.title).toBe('Arbok');
    expect(selectedPokemon.querySelector('.pokemon-mini-sprite, img')).toBeTruthy();
  });

  it('filters pokemon modal options by the modal search field', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    openSelector(compiled, fixture, 'Add Pokemon');

    const modalSearch = compiled.querySelector('.modal-search-field input') as HTMLInputElement;
    modalSearch.value = 'arb';
    modalSearch.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const options = Array.from(compiled.querySelectorAll('.modal-option')).map((option) =>
      option.textContent?.replace(/\s+/g, ' ').trim()
    );

    expect(options).toContain('Arbok');
    expect(options).not.toContain('Mewtwo');
  });

  it('renders Pokemon avatars with tooltip names instead of text chips', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const firstPokemonChip = compiled.querySelector('.pokemon-avatar-chip') as HTMLElement;

    expect(firstPokemonChip).toBeTruthy();
    expect(firstPokemonChip.title).toBe('Grimer');
    expect(firstPokemonChip.textContent?.trim()).toBe('');
    expect(
      firstPokemonChip.querySelector('.pokemon-mini-avatar, .pokemon-mini-sprite')
    ).toBeTruthy();
  });

  it('renders stone icons with tooltip names instead of text chips', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const firstStoneChip = compiled.querySelector('.stone-icon-chip') as HTMLElement;

    expect(firstStoneChip).toBeTruthy();
    expect(firstStoneChip.title).toBe('Sharing Stone');
    expect(firstStoneChip.textContent?.trim()).toBe('');
    expect(firstStoneChip.querySelector('.stone-icon')).toBeTruthy();
  });

  it('opens the Pokemon profile modal from a move compatibility chip', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('.pokemon-avatar-chip') as HTMLElement).click();
    fixture.detectChanges();

    const pokemonProfileService = TestBed.inject(PokemonProfileService);

    expect(pokemonProfileService.selectedPokemonName()).toBe('Grimer');
    expect(pokemonProfileService.selectedProfile()?.entry.name).toBe('Grimer');
  });
});

function openSelector(compiled: HTMLElement, fixture: { detectChanges(): void }, buttonText: string): void {
  findButton(compiled, '.selector-trigger', buttonText).click();
  fixture.detectChanges();
}

function toggleModalOption(
  compiled: HTMLElement,
  fixture: { detectChanges(): void },
  optionText: string
): void {
  findButton(compiled, '.modal-option', optionText).click();
  fixture.detectChanges();
}

function saveModal(compiled: HTMLElement, fixture: { detectChanges(): void }): void {
  findButton(compiled, '.selector-modal-button--primary', 'Save selection').click();
  fixture.detectChanges();
}

function findButton(root: HTMLElement, selector: string, text: string): HTMLButtonElement {
  const button = Array.from(root.querySelectorAll(selector)).find(
    (element) => element.textContent?.replace(/\s+/g, ' ').trim() === text
  );

  expect(button).toBeTruthy();

  return button as HTMLButtonElement;
}
