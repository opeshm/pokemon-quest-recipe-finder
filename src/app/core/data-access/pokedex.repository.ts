import { Injectable } from '@angular/core';
import { POKEDEX_ENTRIES } from '../../features/pokedex/data/pokedex.data';
import { PokedexEntry } from '../../features/pokedex/models/pokedex.model';

@Injectable({ providedIn: 'root' })
export class PokedexRepository {
  getAll(): readonly PokedexEntry[] {
    return POKEDEX_ENTRIES;
  }
}
