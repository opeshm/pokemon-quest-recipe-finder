import { Injectable } from '@angular/core';
import { DishSpriteEntry, DishSpriteMetadata, PokemonSpriteEntry, SpriteMetadata } from '../models/recipe.model';

const TYPE_ICON_BY_NAME: Record<string, string> = {
  Misc: 'normal',
  Red: 'fire',
  Blue: 'water',
  Yellow: 'electric',
  Gray: 'rock',
  Water: 'water',
  Normal: 'normal',
  Poison: 'poison',
  Ground: 'ground',
  Grass: 'grass',
  Bug: 'bug',
  Psychic: 'psychic',
  Rock: 'rock',
  Flying: 'flying',
  Fire: 'fire',
  Electric: 'electric',
  Fighting: 'fighting',
  Fairy: 'fairy',
  Steel: 'steel',
  Ice: 'ice',
  Ghost: 'ghost',
  Dragon: 'dragon',
  Dark: 'dark',
  Legendary: 'dragon'
};

@Injectable({ providedIn: 'root' })
export class RecipeAssetService {
  private readonly pokemonSpriteStyleCache = new Map<string, Record<string, string>>();
  private readonly dishSpriteStyleCache = new Map<string, Record<string, string>>();

  getPokemonSpriteStyle(
    name: string,
    pokemonIndex: PokemonSpriteEntry[],
    pokemonSpriteByName: Map<string, PokemonSpriteEntry>,
    sprite: SpriteMetadata | undefined,
    sizePx = 36
  ): Record<string, string> {
    const cacheKey = `${sprite?.file ?? 'missing'}:${name}:${sizePx}`;
    const cached = this.pokemonSpriteStyleCache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const icon = pokemonSpriteByName.get(name);

    if (!sprite || !icon) {
      const fallback = {
        width: `${sizePx}px`,
        height: `${sizePx}px`
      };
      this.pokemonSpriteStyleCache.set(cacheKey, fallback);
      return fallback;
    }

    const rows = Math.max(...pokemonIndex.map((entry) => entry.spriteRow), 0) + 1;
    const scale = sizePx / sprite.iconSizePx;
    const sheetWidth = (sprite.columns * sprite.cellSizePx + sprite.borderPx) * scale;
    const sheetHeight = (rows * sprite.cellSizePx + sprite.borderPx) * scale;
    const posX = (icon.spriteCol * sprite.cellSizePx + sprite.borderPx) * scale;
    const posY = (icon.spriteRow * sprite.cellSizePx + sprite.borderPx) * scale;

    const style = {
      width: `${sizePx}px`,
      height: `${sizePx}px`,
      'background-image': `url('${sprite.file}')`,
      'background-size': `${sheetWidth}px ${sheetHeight}px`,
      'background-position': `-${posX}px -${posY}px`
    };

    this.pokemonSpriteStyleCache.set(cacheKey, style);
    return style;
  }

  getDishSpriteStyle(
    slug: string,
    dishSpriteBySlug: Map<string, DishSpriteEntry>,
    sprite: DishSpriteMetadata | undefined,
    widthPx = 122
  ): Record<string, string> {
    const cacheKey = `${sprite?.file ?? 'missing'}:${slug}:${widthPx}`;
    const cached = this.dishSpriteStyleCache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const icon = dishSpriteBySlug.get(slug);

    if (!sprite || !icon) {
      const fallback = {
        width: `${widthPx}px`,
        height: `${Math.round(widthPx * 0.62)}px`
      };
      this.dishSpriteStyleCache.set(cacheKey, fallback);
      return fallback;
    }

    const scale = widthPx / sprite.iconWidthPx;
    const sheetWidth = (sprite.columns * sprite.cellWidthPx + sprite.borderPx) * scale;
    const sheetHeight = (sprite.rows * sprite.cellHeightPx + sprite.borderPx) * scale;
    const posX = (icon.spriteCol * sprite.cellWidthPx + sprite.borderPx) * scale;
    const posY = (icon.spriteRow * sprite.cellHeightPx + sprite.borderPx) * scale;

    const style = {
      width: `${widthPx}px`,
      height: `${Math.round(sprite.iconHeightPx * scale)}px`,
      'background-image': `url('${sprite.file}')`,
      'background-size': `${sheetWidth}px ${sheetHeight}px`,
      'background-position': `-${posX}px -${posY}px`
    };

    this.dishSpriteStyleCache.set(cacheKey, style);
    return style;
  }

  ingredientIconPath(code: string): string {
    return `assets/ingredients/${code}.png`;
  }

  ingredientLabel(code: string, ingredientNameByCode: Map<string, string>): string {
    return ingredientNameByCode.get(code) ?? code;
  }

  typeIconPath(typeName: string): string {
    const slug = TYPE_ICON_BY_NAME[typeName] ?? 'normal';
    return `assets/types/${slug}.png`;
  }

  pokemonAvatarPath(number: number): string {
    return `assets/pokemon/${String(number).padStart(3, '0')}.png`;
  }
}
