import { PokedexEntry } from '../../features/pokedex/models/pokedex.model';
import { Recipe } from '../../core/models/recipe-dataset.model';

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
