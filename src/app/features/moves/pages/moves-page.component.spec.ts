import { TestBed } from '@angular/core/testing';
import { MovesPageComponent } from './moves-page.component';

describe('MovesPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovesPageComponent]
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
});
