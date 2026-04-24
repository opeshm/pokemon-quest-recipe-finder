import { RecipeAssetService } from '../../../core/assets/recipe-asset.service';

describe('RecipeAssetService', () => {
  const service = new RecipeAssetService();

  it('builds pokemon sprite styles and fallback styles', () => {
    const style = service.getPokemonSpriteStyle(
      'Bulbasaur',
      [{ id: 1, name: 'Bulbasaur', spriteCol: 0, spriteRow: 0 }],
      new Map([['Bulbasaur', { id: 1, name: 'Bulbasaur', spriteCol: 0, spriteRow: 0 }]]),
      {
        file: 'assets/pokemon-assets.png',
        columns: 10,
        cellSizePx: 260,
        iconSizePx: 256,
        borderPx: 4
      },
      36
    );

    expect(style['background-image']).toContain('pokemon-assets.png');
    expect(style['width']).toBe('36px');

    const fallback = service.getPokemonSpriteStyle('Missing', [], new Map(), undefined, 24);
    expect(fallback).toEqual({ width: '24px', height: '24px' });
  });

  it('builds dish sprite styles and fallback styles', () => {
    const style = service.getDishSpriteStyle(
      'mulligan-stew-a-la-cube',
      new Map([
        [
          'mulligan-stew-a-la-cube',
          {
            slug: 'mulligan-stew-a-la-cube',
            dishName: 'Mulligan Stew a la Cube',
            typeName: 'Misc',
            spriteCol: 0,
            spriteRow: 0
          }
        ]
      ]),
      {
        file: 'assets/recipes-assets.png',
        columns: 4,
        rows: 5,
        cellWidthPx: 203,
        cellHeightPx: 130,
        iconWidthPx: 199,
        iconHeightPx: 126,
        borderPx: 4
      },
      122
    );

    expect(style['background-image']).toContain('recipes-assets.png');
    expect(style['width']).toBe('122px');

    const fallback = service.getDishSpriteStyle('missing', new Map(), undefined, 100);
    expect(fallback).toEqual({ width: '100px', height: '62px' });
  });

  it('resolves ingredient and type asset paths', () => {
    expect(service.ingredientIconPath('bm')).toBe('assets/ingredients/bm.png');
    expect(service.ingredientLabel('bm', new Map([['bm', 'Balm Mushroom']]))).toBe('Balm Mushroom');
    expect(service.ingredientLabel('xx', new Map())).toBe('xx');
    expect(service.typeIconPath('Fire')).toBe('assets/types/fire.png');
    expect(service.typeIconPath('Unknown')).toBe('assets/types/normal.png');
  });
});
