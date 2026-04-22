import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RecipeAssetService } from '../../recipe-explorer/services/recipe-asset.service';
import { POKEMON_QUEST_MOVES } from '../data/moves.data';

const MOVE_ICON_BY_NAME: Record<string, string> = {
  'Acid Armor': 'acidarmor.png',
  'Aerial Ace': 'aerialace.png',
  Agility: 'agility.png',
  Amnesia: 'amnesia.png',
  'Aqua Jet': 'aquajet.png',
  'Aqua Ring': 'aquaring.png',
  Astonish: 'astonish.png',
  'Aurora Veil': 'auroraveil.png',
  Barrier: 'barrier.png',
  'Belly Drum': 'bellydrum.png',
  Blizzard: 'blizzard.png',
  Bonemerang: 'bonemerang.png',
  Bounce: 'bounce.png',
  Bubble: 'bubble.png',
  'Bulk Up': 'bulkup.png',
  'Bullet Seed': 'bulletseed.png',
  Charge: 'charge.png',
  Charm: 'charm.png',
  'Close Combat': 'closecombat.png',
  'Comet Punch': 'cometpunch.png',
  'Confuse Ray': 'confuseray.png',
  'Cross Chop': 'crosschop.png',
  Crunch: 'crunch.png',
  'Dazzling Gleam': 'dazzlinggleam.png',
  Dig: 'dig.png',
  'Draco Meteor': 'dracometeor.png',
  'Dragon Claw': 'dragonclaw.png',
  'Dragon Dance': 'dragondance.png',
  'Dragon Pulse': 'dragonpulse.png',
  'Dragon Rush': 'dragonrush.png',
  'Drain Punch': 'drainpunch.png',
  'Draining Kiss': 'drainingkiss.png',
  'Drill Peck': 'drillpeck.png',
  'Dynamic Punch': 'dynamicpunch.png',
  Earthquake: 'earthquake.png',
  'Egg Bomb': 'eggbomb.png',
  'Electric Terrain': 'electricterrain.png',
  Electroweb: 'electroweb.png',
  Ember: 'ember.png',
  Explosion: 'explosion.png',
  'Extreme Speed': 'extremespeed.png',
  'Fire Blast': 'fireblast.png',
  'Fire Punch': 'firepunch.png',
  'Fire Spin': 'firespin.png',
  Flail: 'flail.png',
  'Flame Charge': 'flamecharge.png',
  'Flame Wheel': 'flamewheel.png',
  Flamethrower: 'flamethrower.png',
  'Flare Blitz': 'flareblitz.png',
  Flash: 'flash.png',
  'Flash Cannon': 'flashcannon.png',
  Flatter: 'flatter.png',
  Fly: 'fly.png',
  'Focus Energy': 'focusenergy.png',
  'Follow Me': 'followme.png',
  'Fury Swipes': 'furyswipes.png',
  'Giga Impact': 'gigaimpact.png',
  Growl: 'growl.png',
  Gust: 'gust.png',
  Harden: 'harden.png',
  'Heat Wave': 'heatwave.png',
  'High Jump Kick': 'highjumpkick.png',
  Hurricane: 'hurricane.png',
  'Hydro Pump': 'hydropump.png',
  'Hyper Beam': 'hyperbeam.png',
  Hypnosis: 'hypnosis.png',
  'Ice Beam': 'icebeam.png',
  'Ice Punch': 'icepunch.png',
  'Icicle Crash': 'iciclecrash.png',
  'Icy Wind': 'icywind.png',
  'Iron Defense': 'irondefense.png',
  'Iron Tail': 'irontail.png',
  'Lava Plume': 'lavaplume.png',
  'Leech Life': 'leechlife.png',
  'Leech Seed': 'leechseed.png',
  Leer: 'leer.png',
  Lick: 'lick.png',
  'Light Screen': 'lightscreen.png',
  Lunge: 'lunge.png',
  Meditate: 'meditate.png',
  'Mega Drain': 'megadrain.png',
  'Mega Punch': 'megapunch.png',
  Megahorn: 'megahorn.png',
  'Metal Claw': 'metalclaw.png',
  'Metal Sound': 'metalsound.png',
  'Mud Bomb': 'mudbomb.png',
  'Mud-Slap': 'mud-slap.png',
  'Nasty Plot': 'nastyplot.png',
  'Night Slash': 'nightslash.png',
  Outrage: 'outrage.png',
  'Petal Dance': 'petaldance.png',
  'Pin Missile': 'pinmissile.png',
  'Play Rough': 'playrough.png',
  'Poison Powder': 'poisonpowder.png',
  'Poison Sting': 'poisonsting.png',
  'Power-Up Punch': 'power-uppunch.png',
  Psybeam: 'psybeam.png',
  Psychic: 'psychic.png',
  'Psycho Cut': 'psychocut.png',
  Psystrike: 'psystrike.png',
  'Rage Powder': 'ragepowder.png',
  'Razor Leaf': 'razorleaf.png',
  Recover: 'recover.png',
  Rest: 'rest.png',
  Roar: 'roar.png',
  'Rock Blast': 'rockblast.png',
  'Rock Polish': 'rockpolish.png',
  'Rock Smash': 'rocksmash.png',
  'Rock Throw': 'rockthrow.png',
  'Rock Tomb': 'rocktomb.png',
  'Rolling Kick': 'rollingkick.png',
  Rollout: 'rollout.png',
  Roost: 'roost.png',
  Sandstorm: 'sandstorm.png',
  Scratch: 'scratch.png',
  'Self-Destruct': 'self-destruct.png',
  'Shadow Ball': 'shadowball.png',
  'Shore Up': 'shoreup.png',
  'Silver Wind': 'silverwind.png',
  Sing: 'sing.png',
  'Sky Attack': 'skyattack.png',
  Slam: 'slam.png',
  'Sludge Bomb': 'sludgebomb.png',
  Smog: 'smog.png',
  'Soft-Boiled': 'soft-boiled.png',
  'Solar Beam': 'solarbeam.png',
  Spark: 'spark.png',
  Spikes: 'spikes.png',
  Splash: 'splash.png',
  Spore: 'spore.png',
  'Stealth Rock': 'stealthrock.png',
  'Steel Wing': 'steelwing.png',
  Stomp: 'stomp.png',
  'String Shot': 'stringshot.png',
  'Stun Spore': 'stunspore.png',
  Submission: 'submission.png',
  Substitute: 'substitute.png',
  'Sucker Punch': 'suckerpunch.png',
  Supersonic: 'supersonic.png',
  Surf: 'surf.png',
  'Sweet Kiss': 'sweetkiss.png',
  'Swords Dance': 'swordsdance.png',
  Synthesis: 'synthesis.png',
  Tackle: 'tackle.png',
  Tailwind: 'tailwind.png',
  'Take Down': 'takedown.png',
  Taunt: 'taunt.png',
  Teleport: 'teleport.png',
  Thunder: 'thunder.png',
  'Thunder Punch': 'thunderpunch.png',
  'Thunder Shock': 'thundershock.png',
  Thunderbolt: 'thunderbolt.png',
  Toxic: 'toxic.png',
  Transform: 'transform.png',
  'Tri Attack': 'triattack.png',
  Twister: 'twister.png',
  'U-turn': 'u-turn.png',
  'Venom Drench': 'venomdrench.png',
  'Vine Whip': 'vinewhip.png',
  'Volt Tackle': 'volttackle.png',
  Waterfall: 'waterfall.png',
  Whirlpool: 'whirlpool.png',
  Whirlwind: 'whirlwind.png',
  'Will-O-Wisp': 'will-o-wisp.png',
  Withdraw: 'withdraw.png',
  'Work Up': 'workup.png',
  'Zen Headbutt': 'zenheadbutt.png'
};

@Component({
  selector: 'app-moves-page',
  imports: [CommonModule],
  templateUrl: './moves-page.component.html',
  styleUrl: './moves-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovesPageComponent {
  private readonly recipeAssetService = inject(RecipeAssetService);

  private readonly _nameFilter = signal('');
  private readonly _selectedType = signal('');
  private readonly _selectedStone = signal('');
  private readonly _pokemonFilter = signal('');

  readonly moves = POKEMON_QUEST_MOVES;
  readonly nameFilter = this._nameFilter.asReadonly();
  readonly selectedType = this._selectedType.asReadonly();
  readonly selectedStone = this._selectedStone.asReadonly();
  readonly pokemonFilter = this._pokemonFilter.asReadonly();

  readonly typeOptions = computed(() =>
    [...new Set(this.moves.map((move) => move.type))].sort((left, right) => left.localeCompare(right))
  );

  readonly stoneOptions = computed(() =>
    [...new Set(this.moves.flatMap((move) => move.stones))].sort((left, right) =>
      left.localeCompare(right)
    )
  );

  readonly filteredMoves = computed(() => {
    const moveName = this.nameFilter().trim().toLocaleLowerCase();
    const type = this.selectedType();
    const stone = this.selectedStone();
    const pokemon = this.pokemonFilter().trim().toLocaleLowerCase();

    return this.moves.filter(
      (move) =>
        (!moveName || move.name.toLocaleLowerCase().includes(moveName)) &&
        (!type || move.type === type) &&
        (!stone || move.stones.includes(stone)) &&
        (!pokemon || move.pokemon.some((entry) => entry.toLocaleLowerCase().includes(pokemon)))
    );
  });

  readonly visiblePokemonCount = computed(
    () => new Set(this.filteredMoves().flatMap((move) => move.pokemon)).size
  );

  readonly hasActiveFilters = computed(
    () =>
      this.nameFilter().length > 0 ||
      this.selectedType().length > 0 ||
      this.selectedStone().length > 0 ||
      this.pokemonFilter().length > 0
  );

  updateNameFilter(value: string): void {
    this._nameFilter.set(value);
  }

  updateTypeFilter(value: string): void {
    this._selectedType.set(value);
  }

  updateStoneFilter(value: string): void {
    this._selectedStone.set(value);
  }

  updatePokemonFilter(value: string): void {
    this._pokemonFilter.set(value);
  }

  clearFilters(): void {
    this._nameFilter.set('');
    this._selectedType.set('');
    this._selectedStone.set('');
    this._pokemonFilter.set('');
  }

  typeIconPath(typeName: string): string {
    return this.recipeAssetService.typeIconPath(typeName);
  }

  moveIconPath(name: string): string {
    return `assets/moves/${MOVE_ICON_BY_NAME[name]}`;
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByValue(_: number, value: string): string {
    return value;
  }
}
