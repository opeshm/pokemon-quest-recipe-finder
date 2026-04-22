export type PokemonStyle = 'Melee' | 'Range';

export interface PokedexEntry {
  number: number;
  name: string;
  types: string[];
  style: PokemonStyle;
  baseHp: number;
  baseAtk: number;
  obtainingMethod: string;
}
