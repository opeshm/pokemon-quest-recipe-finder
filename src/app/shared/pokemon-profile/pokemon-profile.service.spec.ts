import { TestBed } from '@angular/core/testing';
import { PokemonProfileService } from './pokemon-profile.service';

describe('PokemonProfileService', () => {
  it('builds a profile with evolution chain, moves, and recipes', () => {
    const service = TestBed.inject(PokemonProfileService);

    service.setRecipes([
      {
        id: 'recipe-1',
        recipeName: 'Mulligan Stew a la Cube',
        dishName: 'Mulligan Stew a la Cube',
        dishSlug: 'mulligan-stew-a-la-cube',
        typeName: 'Misc',
        quality: 'Special',
        qualityTier: 4,
        ingredients: [],
        ingredientPattern: [],
        pokemonResults: [{ name: 'Bulbasaur', attractRate: 66.66 }],
        source: { page: 'https://example.com', extractionType: 'test' }
      }
    ]);

    service.open('Bulbasaur');

    const profile = service.selectedProfile();

    expect(profile?.entry.name).toBe('Bulbasaur');
    expect(profile?.evolutionChain.map((step) => step.pokemon.name)).toEqual([
      'Bulbasaur',
      'Ivysaur',
      'Venusaur'
    ]);
    expect(profile?.moves.some((move) => move.name === 'Vine Whip')).toBe(true);
    expect(profile?.moves.find((move) => move.name === 'Vine Whip')?.iconPath).toContain(
      'assets/moves/vinewhip.png'
    );
    expect(profile?.recipes.map((recipe) => recipe.recipeName)).toEqual(['Mulligan Stew a la Cube']);
  });

  it('deduplicates repeated recipe names and keeps the highest attract rate', () => {
    const service = TestBed.inject(PokemonProfileService);

    service.setRecipes([
      {
        id: 'recipe-1',
        recipeName: 'Mulligan Stew a la Cube',
        dishName: 'Mulligan Stew a la Cube',
        dishSlug: 'mulligan-stew-a-la-cube',
        typeName: 'Misc',
        quality: 'Good',
        qualityTier: 2,
        ingredients: [],
        ingredientPattern: [],
        pokemonResults: [{ name: 'Bulbasaur', attractRate: 33.33 }],
        source: { page: 'https://example.com/1', extractionType: 'test' }
      },
      {
        id: 'recipe-2',
        recipeName: 'Mulligan Stew a la Cube',
        dishName: 'Mulligan Stew a la Cube',
        dishSlug: 'mulligan-stew-a-la-cube',
        typeName: 'Misc',
        quality: 'Special',
        qualityTier: 4,
        ingredients: [],
        ingredientPattern: [],
        pokemonResults: [{ name: 'Bulbasaur', attractRate: 66.66 }],
        source: { page: 'https://example.com/2', extractionType: 'test' }
      }
    ]);

    service.open('Bulbasaur');

    const profile = service.selectedProfile();

    expect(profile?.recipes).toHaveLength(1);
    expect(profile?.recipes[0].quality).toBe('Special');
    expect(profile?.recipes[0].attractRate).toBe(66.66);
  });

  it('handles branched evolution chains', () => {
    const service = TestBed.inject(PokemonProfileService);

    service.open('Eevee');

    const profile = service.selectedProfile();

    expect(profile?.evolutionChain.map((step) => step.pokemon.name)).toEqual([
      'Eevee',
      'Vaporeon',
      'Jolteon',
      'Flareon'
    ]);
  });
});
