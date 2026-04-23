import { Injectable, computed, signal } from '@angular/core';
import { POKEDEX_ENTRIES } from '../../features/pokedex/data/pokedex.data';
import { PokedexEntry } from '../../features/pokedex/models/pokedex.model';
import { POKEMON_QUEST_MOVES } from '../../features/moves/data/moves.data';
import { Recipe } from '../../core/models/recipe-dataset.model';
import { moveIconPath } from '../../features/moves/utils/move-icon.util';
import { PokemonProfileViewModel } from './pokemon-profile.model';

@Injectable({ providedIn: 'root' })
export class PokemonProfileService {
  private readonly _selectedPokemonName = signal<string | null>(null);
  private readonly _recipes = signal<readonly Recipe[]>([]);

  readonly selectedPokemonName = this._selectedPokemonName.asReadonly();

  readonly selectedProfile = computed<PokemonProfileViewModel | null>(() => {
    const name = this.selectedPokemonName();

    if (!name) {
      return null;
    }

    const entry = POKEDEX_ENTRIES.find((pokemon) => pokemon.name === name);

    if (!entry) {
      return null;
    }

    const moves = POKEMON_QUEST_MOVES.filter((move) => move.pokemon.includes(name))
      .map((move) => ({
        name: move.name,
        type: move.type,
        waitTime: move.waitTime,
        power: move.power,
        iconPath: moveIconPath(move.name)
      }))
      .sort((left, right) => left.name.localeCompare(right.name));

    const recipes = Array.from(
      this._recipes()
        .filter((recipe) => recipe.pokemonResults.some((pokemon) => pokemon.name === name))
        .reduce(
          (map, recipe) => {
            const attractRate = recipe.pokemonResults.find((pokemon) => pokemon.name === name)?.attractRate ?? 0;
            const existing = map.get(recipe.recipeName);

            if (!existing || attractRate > existing.attractRate) {
              map.set(recipe.recipeName, {
                id: recipe.id,
                recipeName: recipe.recipeName,
                dishSlug: recipe.dishSlug,
                typeName: recipe.typeName,
                quality: recipe.quality,
                attractRate
              });
            }

            return map;
          },
          new Map<string, PokemonProfileViewModel['recipes'][number]>()
        )
        .values()
    ).sort((left, right) => right.attractRate - left.attractRate || left.recipeName.localeCompare(right.recipeName));

    return {
      entry,
      evolutionChain: this.buildEvolutionChain(entry),
      moves,
      recipes
    };
  });

  setRecipes(recipes: readonly Recipe[]): void {
    this._recipes.set(recipes);
  }

  open(name: string): void {
    if (!POKEDEX_ENTRIES.some((entry) => entry.name === name)) {
      return;
    }

    this._selectedPokemonName.set(name);
  }

  close(): void {
    this._selectedPokemonName.set(null);
  }

  private buildEvolutionChain(entry: PokedexEntry) {
    const rootName = this.findBasePokemonName(entry);
    const root = POKEDEX_ENTRIES.find((pokemon) => pokemon.name === rootName) ?? entry;
    const chain = [{ pokemon: root, requirement: null as string | null }];
    this.collectDescendants(root, chain);
    return chain;
  }

  private collectDescendants(
    current: PokedexEntry,
    chain: Array<{ pokemon: PokedexEntry; requirement: string | null }>
  ): void {
    const descendants = POKEDEX_ENTRIES.filter((pokemon) => this.getEvolutionSourceName(pokemon) === current.name);

    for (const descendant of descendants) {
      chain.push({
        pokemon: descendant,
        requirement: this.getEvolutionRequirement(descendant)
      });
      this.collectDescendants(descendant, chain);
    }
  }

  private findBasePokemonName(entry: PokedexEntry): string {
    let current = entry;
    let source = this.getEvolutionSourceName(current);

    while (source) {
      const previous = POKEDEX_ENTRIES.find((pokemon) => pokemon.name === source);

      if (!previous) {
        break;
      }

      current = previous;
      source = this.getEvolutionSourceName(current);
    }

    return current.name;
  }

  private getEvolutionSourceName(entry: PokedexEntry): string | null {
    const match = /^Evolve\s+(.+?)\s+\(/.exec(entry.obtainingMethod);
    const sourceName = match?.[1] ?? null;

    if (sourceName !== 'Nidoran') {
      return sourceName;
    }

    return entry.number < 32 ? 'Nidoran♀' : 'Nidoran♂';
  }

  private getEvolutionRequirement(entry: PokedexEntry): string | null {
    const match = /^Evolve\s+.+?\s+\((.+)\)$/.exec(entry.obtainingMethod);
    return match?.[1] ?? null;
  }
}
