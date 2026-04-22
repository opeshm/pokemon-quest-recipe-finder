import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoadState } from '../../recipe-explorer/models/load-state.model';
import { RecipeDataset } from '../../recipe-explorer/models/recipe.model';
import { RecipeDataService } from '../../recipe-explorer/services/recipe-data.service';
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
          provide: RecipeDataService,
          useValue: {
            dataset$: of(mockDataset),
            loadState$: of({ status: 'success', data: mockDataset } as LoadState<RecipeDataset>),
            reload: vi.fn()
          }
        }
      ]
    }).compileComponents();
  });

  it('renders the full Pokemon Quest move list and preserves duplicate Transform rows', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const moveTitles = Array.from(compiled.querySelectorAll('.move-card h2')).map((heading) =>
      heading.textContent?.trim()
    );

    expect(compiled.querySelector('h1')?.textContent).toContain('All Pokemon Quest moves');
    expect(compiled.querySelectorAll('.move-card')).toHaveLength(169);
    expect(moveTitles.filter((title) => title === 'Transform')).toHaveLength(3);
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
    const [nameInput, pokemonInput] = Array.from(
      compiled.querySelectorAll('input[type="search"]')
    ) as HTMLInputElement[];
    const [typeSelect, stoneSelect] = Array.from(compiled.querySelectorAll('select')) as [
      HTMLSelectElement,
      HTMLSelectElement
    ];

    nameInput.value = 'bolt';
    nameInput.dispatchEvent(new Event('input'));

    typeSelect.value = 'Electric';
    typeSelect.dispatchEvent(new Event('change'));

    stoneSelect.value = 'Stay Strong Stone';
    stoneSelect.dispatchEvent(new Event('change'));

    pokemonInput.value = 'mewtwo';
    pokemonInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const visibleMoves = Array.from(compiled.querySelectorAll('.move-card h2')).map((heading) =>
      heading.textContent?.trim()
    );

    expect(visibleMoves).toEqual(['Thunderbolt']);
  });

  it('clears all active filters', async () => {
    const fixture = TestBed.createComponent(MovesPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const [nameInput] = Array.from(compiled.querySelectorAll('input[type="search"]')) as [
      HTMLInputElement,
      HTMLInputElement
    ];
    const clearButton = compiled.querySelector('.clear-button') as HTMLButtonElement;

    nameInput.value = 'transform';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    clearButton.click();
    fixture.detectChanges();

    expect(nameInput.value).toBe('');
    expect(compiled.querySelectorAll('.move-card')).toHaveLength(169);
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
});
