export interface PokemonQuestMove {
  readonly name: string;
  readonly type: string;
  readonly waitTime: number;
  readonly power: number;
  readonly description: string;
  readonly stones: readonly string[];
  readonly pokemon: readonly string[];
}
