import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovesRepository } from '../../core/data-access/moves.repository';
import { PokedexRepository } from '../../core/data-access/pokedex.repository';
import { RECIPES_REPOSITORY, RecipesRepository } from '../../core/data-access/recipes.repository';
import { PokedexEntry } from '../../features/pokedex/models/pokedex.model';
import { moveIconPath } from '../../features/moves/utils/move-icon.util';
import { PokemonProfileViewModel } from './pokemon-profile.model';

@Injectable({ providedIn: 'root' })
export class PokemonProfileService {
  private readonly pokedexRepository = inject(PokedexRepository);
  private readonly movesRepository = inject(MovesRepository);
  private readonly recipesRepository = inject<RecipesRepository>(RECIPES_REPOSITORY);

  private readonly _selectedPokemonName = signal<string | null>(null);
  private readonly pokedexEntries = this.pokedexRepository.getAll();
  private readonly moves = this.movesRepository.getAll();

  readonly selectedPokemonName = this._selectedPokemonName.asReadonly();
  readonly dataset = toSignal(this.recipesRepository.dataset$, { initialValue: null });

  readonly selectedProfile = computed<PokemonProfileViewModel | null>(() => {
    const name = this.selectedPokemonName();

    if (!name) {
      return null;
    }

    const entry = this.pokedexEntries.find((pokemon) => pokemon.name === name);

    if (!entry) {
      return null;
    }

    const moves = this.moves
      .filter((move) => move.pokemon.includes(name))
      .map((move) => ({
        name: move.name,
        type: move.type,
        waitTime: move.waitTime,
        power: move.power,
        iconPath: moveIconPath(move.name)
      }))
      .sort((left, right) => left.name.localeCompare(right.name));

    const recipes = Array.from(
      (this.dataset()?.recipes ?? [])
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

  open(name: string): void {
    if (!this.pokedexEntries.some((entry) => entry.name === name)) {
      return;
    }

    this._selectedPokemonName.set(name);
  }

  close(): void {
    this._selectedPokemonName.set(null);
  }

  private buildEvolutionChain(entry: PokedexEntry) {
    const rootName = this.findBasePokemonName(entry);
    const root = this.pokedexEntries.find((pokemon) => pokemon.name === rootName) ?? entry;
    const chain = [{ pokemon: root, requirement: null as string | null }];
    this.collectDescendants(root, chain);
    return chain;
  }

  private collectDescendants(
    current: PokedexEntry,
    chain: Array<{ pokemon: PokedexEntry; requirement: string | null }>
  ): void {
    const descendants = this.pokedexEntries.filter((pokemon) => this.getEvolutionSourceName(pokemon) === current.name);

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
      const previous = this.pokedexEntries.find((pokemon) => pokemon.name === source);

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
