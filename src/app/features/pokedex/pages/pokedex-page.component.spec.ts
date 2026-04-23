import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RECIPES_REPOSITORY } from '../../../core/data-access/recipes.repository';
import { LoadState } from '../../../core/models/load-state.model';
import { RecipeDataset } from '../../../core/models/recipe-dataset.model';
import { PokemonProfileService } from '../../../shared/pokemon-profile/pokemon-profile.service';
import { PokedexPageComponent } from './pokedex-page.component';

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
    { id: 1, name: 'Bulbasaur', spriteCol: 0, spriteRow: 0 },
    { id: 63, name: 'Abra', spriteCol: 2, spriteRow: 6 },
    { id: 81, name: 'Magnemite', spriteCol: 0, spriteRow: 8 },
    { id: 82, name: 'Magneton', spriteCol: 1, spriteRow: 8 },
    { id: 145, name: 'Zapdos', spriteCol: 4, spriteRow: 14 }
  ],
  dishIndex: [],
  recipes: []
};

describe('PokedexPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexPageComponent],
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

  it('renders the full Pokemon Quest roster', async () => {
    const fixture = TestBed.createComponent(PokedexPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Every Pokemon available');
    expect(compiled.querySelectorAll('.pokedex-card')).toHaveLength(151);
  });

  it('filters the roster by style and type through selector modals', async () => {
    const fixture = TestBed.createComponent(PokedexPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    openSelector(compiled, fixture, 'Add Style');
    toggleModalOption(compiled, fixture, 'Range');
    saveModal(compiled, fixture);

    openSelector(compiled, fixture, 'Add Type');
    toggleModalOption(compiled, fixture, 'Electric');
    saveModal(compiled, fixture);

    const visiblePokemon = Array.from(compiled.querySelectorAll('.pokedex-card h2')).map((heading) =>
      heading.textContent?.trim()
    );

    expect(visiblePokemon).toEqual(['Magnemite', 'Magneton', 'Zapdos']);
  });

  it('sorts the roster by selected ordering option', async () => {
    const fixture = TestBed.createComponent(PokedexPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    openSelector(compiled, fixture, 'Change Sort');
    toggleModalOption(compiled, fixture, 'ATK');
    saveModal(compiled, fixture);

    const firstPokemon = compiled.querySelector('.pokedex-card h2')?.textContent?.trim();

    expect(firstPokemon).toBe('Mewtwo');
  });

  it('filters the roster by Pokemon name search', async () => {
    const fixture = TestBed.createComponent(PokedexPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nameInput = compiled.querySelector('input[type="search"]') as HTMLInputElement;

    nameInput.value = 'saur';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const visiblePokemon = Array.from(compiled.querySelectorAll('.pokedex-card h2')).map((heading) =>
      heading.textContent?.trim()
    );

    expect(visiblePokemon).toEqual(['Bulbasaur', 'Ivysaur', 'Venusaur']);
  });

  it('uses downloaded avatar assets when the sprite sheet has no entry', async () => {
    const fixture = TestBed.createComponent(PokedexPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const component = fixture.componentInstance;

    expect(component.hasSprite('Ivysaur')).toBe(false);
    expect(component.pokemonAvatarPath(2)).toBe('assets/pokemon/002.png');
  });

  it('opens the Pokemon profile modal when a Pokedex card is clicked', async () => {
    const fixture = TestBed.createComponent(PokedexPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('.pokedex-card') as HTMLElement).click();
    fixture.detectChanges();

    const pokemonProfileService = TestBed.inject(PokemonProfileService);

    expect(pokemonProfileService.selectedPokemonName()).toBe('Bulbasaur');
    expect(pokemonProfileService.selectedProfile()?.entry.name).toBe('Bulbasaur');
  });
});

function openSelector(
  compiled: HTMLElement,
  fixture: { detectChanges(): void },
  buttonText: string
): void {
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
  const button = Array.from(root.querySelectorAll(selector)).find((element) =>
    element.textContent?.replace(/\s+/g, ' ').trim().includes(text)
  );

  expect(button).toBeTruthy();

  return button as HTMLButtonElement;
}
