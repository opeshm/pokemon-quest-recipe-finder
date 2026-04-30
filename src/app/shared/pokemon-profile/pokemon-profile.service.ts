import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovesRepository } from '../../core/data-access/moves.repository';
import { PokedexRepository } from '../../core/data-access/pokedex.repository';
import { RECIPES_REPOSITORY, RecipesRepository } from '../../core/data-access/recipes.repository';
import { PokedexEntry } from '../../features/pokedex/models/pokedex.model';
import { moveIconPath } from '../../features/moves/utils/move-icon.util';
import {
  PokemonProfileModalViewModel,
  PokemonProfileMoveViewModel,
  PokemonProfileRecipeViewModel,
  PokemonProfileViewModel
} from './pokemon-profile.model';

type ModalSelection =
  | { kind: 'pokemon'; name: string }
  | { kind: 'move'; name: string }
  | { kind: 'recipe'; id: string; pokemonName: string | null };

@Injectable({ providedIn: 'root' })
export class PokemonProfileService {
  private readonly pokedexRepository = inject(PokedexRepository);
  private readonly movesRepository = inject(MovesRepository);
  private readonly recipesRepository = inject<RecipesRepository>(RECIPES_REPOSITORY);

  private readonly _selection = signal<ModalSelection | null>(null);
  private readonly pokedexEntries = this.pokedexRepository.getAll();
  private readonly moves = this.movesRepository.getAll();

  readonly pokemonNumberByName = new Map(this.pokedexEntries.map((entry) => [entry.name, entry.number]));

  readonly selectedPokemonName = computed(() => {
    const selection = this._selection();

    return selection?.kind === 'pokemon' ? selection.name : null;
  });
  readonly dataset = toSignal(this.recipesRepository.dataset$, { initialValue: null });

  readonly selectedView = computed<PokemonProfileModalViewModel | null>(() => {
    const selection = this._selection();

    if (!selection) {
      return null;
    }

    switch (selection.kind) {
      case 'pokemon': {
        const profile = this.buildPokemonProfile(selection.name);
        return profile ? { kind: 'pokemon', profile } : null;
      }
      case 'move': {
        const move = this.buildMoveView(selection.name);
        return move ? { kind: 'move', move } : null;
      }
      case 'recipe': {
        const recipe = this.buildRecipeView(selection.id, selection.pokemonName);
        return recipe ? { kind: 'recipe', recipe } : null;
      }
    }

    return null;
  });

  readonly selectedProfile = computed<PokemonProfileViewModel | null>(() => {
    const selectedView = this.selectedView();

    return selectedView?.kind === 'pokemon' ? selectedView.profile : null;
  });

  open(name: string): void {
    if (!this.pokedexEntries.some((entry) => entry.name === name)) {
      return;
    }

    this._selection.set({ kind: 'pokemon', name });
  }

  openMove(name: string): void {
    if (!this.moves.some((move) => move.name === name)) {
      return;
    }

    this._selection.set({ kind: 'move', name });
  }

  openRecipe(id: string, pokemonName: string | null = this.selectedPokemonName()): void {
    if (!this.dataset()?.recipes.some((recipe) => recipe.id === id)) {
      return;
    }

    this._selection.set({ kind: 'recipe', id, pokemonName });
  }

  close(): void {
    this._selection.set(null);
  }

  private buildPokemonProfile(name: string): PokemonProfileViewModel | null {
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
  }

  private buildMoveView(name: string): PokemonProfileMoveViewModel | null {
    const move = this.moves.find((entry) => entry.name === name);

    return move ? { ...move, iconPath: moveIconPath(move.name) } : null;
  }

  private buildRecipeView(id: string, pokemonName: string | null): PokemonProfileRecipeViewModel | null {
    const recipe = this.dataset()?.recipes.find((entry) => entry.id === id);

    if (!recipe) {
      return null;
    }

    const attractRate = pokemonName
      ? recipe.pokemonResults.find((pokemon) => pokemon.name === pokemonName)?.attractRate ?? null
      : null;

    return {
      recipe,
      attractRate,
      maxAttractRate: recipe.pokemonResults[0]?.attractRate ?? 0
    };
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
