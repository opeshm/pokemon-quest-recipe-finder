import { Injectable } from '@angular/core';
import { POKEMON_QUEST_MOVES } from '../../features/moves/data/moves.data';
import { PokemonQuestMove } from '../../features/moves/models/move.model';

@Injectable({ providedIn: 'root' })
export class MovesRepository {
  getAll(): readonly PokemonQuestMove[] {
    return POKEMON_QUEST_MOVES;
  }
}
