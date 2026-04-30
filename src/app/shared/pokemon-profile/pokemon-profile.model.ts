import { PokedexEntry } from '../../features/pokedex/models/pokedex.model';
import { Recipe } from '../../core/models/recipe-dataset.model';
import { PokemonQuestMove } from '../../features/moves/models/move.model';

export type EvolutionChainStep = {
  pokemon: PokedexEntry;
  requirement: string | null;
};

export type PokemonProfileViewModel = {
  entry: PokedexEntry;
  evolutionChain: EvolutionChainStep[];
  moves: Array<{
    name: string;
    type: string;
    waitTime: number;
    power: number;
    iconPath: string;
  }>;
  recipes: Array<{
    id: string;
    recipeName: string;
    dishSlug: string;
    typeName: string;
    quality: Recipe['quality'];
    attractRate: number;
  }>;
};

export type PokemonProfileMoveViewModel = PokemonQuestMove & {
  iconPath: string;
};

export type PokemonProfileRecipeViewModel = {
  recipe: Recipe;
  attractRate: number | null;
  maxAttractRate: number;
};

export type PokemonProfileModalViewModel =
  | {
      kind: 'pokemon';
      profile: PokemonProfileViewModel;
    }
  | {
      kind: 'move';
      move: PokemonProfileMoveViewModel;
    }
  | {
      kind: 'recipe';
      recipe: PokemonProfileRecipeViewModel;
    };
