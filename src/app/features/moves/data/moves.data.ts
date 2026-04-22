import { PokemonQuestMove } from '../models/move.model';

export const POKEMON_QUEST_MOVES: readonly PokemonQuestMove[] = [
  {
    "name": "Acid Armor",
    "type": "Poison",
    "waitTime": 5,
    "power": 0,
    "description": "The user alters its cellular structure to liquefy itself, reducing the damage it takes for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Grimer",
      "Muk",
      "Vaporeon"
    ]
  },
  {
    "name": "Aerial Ace",
    "type": "Flying",
    "waitTime": 5,
    "power": 124,
    "description": "The user quickly slashes in front of itself twice, dealing damage.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Beedrill",
      "Spearow",
      "Fearow",
      "Sandslash",
      "Dodrio",
      "Marowak",
      "Scyther",
      "Kabutops"
    ]
  },
  {
    "name": "Agility",
    "type": "Psychic",
    "waitTime": 2,
    "power": 0,
    "description": "The user relaxes and lightens its body, raising its movement speed for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Beedrill",
      "Pidgeotto",
      "Pidgeot",
      "Raichu",
      "Parasect",
      "Venomoth",
      "Arcanine",
      "Ponyta",
      "Rapidash",
      "Doduo",
      "Dodrio",
      "Horsea",
      "Seadra",
      "Seaking",
      "Scyther",
      "Jolteon",
      "Porygon",
      "Aerodactyl",
      "Articuno",
      "Zapdos",
      "Dratini",
      "Dragonair",
      "Dragonite"
    ]
  },
  {
    "name": "Amnesia",
    "type": "Psychic",
    "waitTime": 8,
    "power": 0,
    "description": "The user temporarily empties its mind to forget its concerns, raising the amount of damage it deals and making it more resistant to negative effects.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Nidorino",
      "Nidoking",
      "Clefable",
      "Psyduck",
      "Golduck",
      "Poliwhirl",
      "Poliwrath",
      "Slowbro",
      "Lickitung",
      "Tangela",
      "Snorlax",
      "Mew"
    ]
  },
  {
    "name": "Aqua Jet",
    "type": "Water",
    "waitTime": 5,
    "power": 182,
    "description": "The user charges at enemies in front of itself with tremendous speed, dealing damage to them.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Wartortle",
      "Blastoise",
      "Dewgong",
      "Goldeen",
      "Seaking",
      "Kabuto",
      "Kabutops"
    ]
  },
  {
    "name": "Aqua Ring",
    "type": "Water",
    "waitTime": 9,
    "power": 0,
    "description": "The user envelops itself in a veil made of water, restoring some of its HP.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Blastoise",
      "Dewgong",
      "Vaporeon"
    ]
  },
  {
    "name": "Astonish",
    "type": "Ghost",
    "waitTime": 5,
    "power": 180,
    "description": "The user tries to startle enemies directly in front of itself, damaging those taken by surprise.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Gastly",
      "Haunter",
      "Gengar"
    ]
  },
  {
    "name": "Aurora Veil",
    "type": "Ice",
    "waitTime": 7,
    "power": 0,
    "description": "The user cloaks itself in a veil of light, reducing the amount of damage it takes for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Dewgong",
      "Jynx",
      "Lapras",
      "Articuno"
    ]
  },
  {
    "name": "Barrier",
    "type": "Psychic",
    "waitTime": 5,
    "power": 0,
    "description": "The user throws up a wall around itself, lowering the amount of damage it takes for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Kadabra",
      "Alakazam",
      "Tentacool",
      "Tentacruel",
      "Shellder",
      "Cloyster",
      "Drowzee",
      "Hypno",
      "Mr. Mime"
    ]
  },
  {
    "name": "Belly Drum",
    "type": "Normal",
    "waitTime": 5,
    "power": 0,
    "description": "The user uses its own HP to raise all of its stats for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Clefable",
      "Slowbro",
      "Marowak",
      "Lickitung",
      "Magmar",
      "Snorlax"
    ]
  },
  {
    "name": "Blizzard",
    "type": "Ice",
    "waitTime": 5,
    "power": 52,
    "description": "The user moves about while creating a blizzard centered on itself. Deals damage to enemies around the user and sometimes freezes them.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Blastoise",
      "Seel",
      "Dewgong",
      "Starmie",
      "Jynx",
      "Tauros",
      "Lapras",
      "Articuno",
      "Mewtwo"
    ]
  },
  {
    "name": "Bonemerang",
    "type": "Ground",
    "waitTime": 7,
    "power": 131,
    "description": "The user throws a boomerang made of bone, damaging enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Cubone",
      "Marowak"
    ]
  },
  {
    "name": "Bounce",
    "type": "Flying",
    "waitTime": 5,
    "power": 186,
    "description": "The user bounces forward high into the air twice, damaging enemies it hits.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Wigglytuff",
      "Ponyta",
      "Rapidash",
      "Hitmonlee",
      "Seaking",
      "Magikarp",
      "Gyarados"
    ]
  },
  {
    "name": "Bubble",
    "type": "Water",
    "waitTime": 7,
    "power": 68,
    "description": "The user fires bubbles in three directions. Deals damage to enemies hit by the bubbles and sometimes lowers their movement speed.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Squirtle",
      "Wartortle",
      "Blastoise",
      "Poliwag",
      "Poliwhirl",
      "Poliwrath",
      "Tentacool",
      "Tentacruel",
      "Shellder",
      "Cloyster",
      "Horsea",
      "Seadra",
      "Omanyte",
      "Omastar"
    ]
  },
  {
    "name": "Bulk Up",
    "type": "Fighting",
    "waitTime": 8,
    "power": 0,
    "description": "The user tenses its muscles to bulk up its body, raising the damage it deals for a while. This also reduces the damage the user takes.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Poliwhirl",
      "Poliwrath",
      "Machop",
      "Machoke",
      "Machamp",
      "Hitmonlee",
      "Pinsir",
      "Mewtwo"
    ]
  },
  {
    "name": "Bullet Seed",
    "type": "Grass",
    "waitTime": 7,
    "power": 168,
    "description": "The user sends several seeds flying out in front of itself simultaneously, damaging enemies hit by them.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Gloom",
      "Vileplume",
      "Parasect",
      "Bellsprout",
      "Weepinbell",
      "Victreebel",
      "Exeggutor"
    ]
  },
  {
    "name": "Charge",
    "type": "Electric",
    "waitTime": 9,
    "power": 0,
    "description": "The user stores up electricity, raising the damage it deals and making it resistant to negative effects for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Raichu",
      "Magnemite",
      "Magneton",
      "Electrode",
      "Electabuzz",
      "Zapdos"
    ]
  },
  {
    "name": "Charm",
    "type": "Fairy",
    "waitTime": 3,
    "power": 0,
    "description": "The user makes surrounding enemies less wary with its cute behavior, often reducing the amount of damage they deal.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Vulpix",
      "Ninetales",
      "Gloom",
      "Vileplume",
      "Chansey",
      "Mr. Mime",
      "Eevee",
      "Vaporeon",
      "Jolteon",
      "Flareon"
    ]
  },
  {
    "name": "Close Combat",
    "type": "Fighting",
    "waitTime": 5,
    "power": 245,
    "description": "The user gets right up on enemies in front of itself and smacks them with a single blow, damaging them. Sometimes raises the amount of damage the user takes.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Primeape",
      "Machamp",
      "Hitmonlee",
      "Hitmonchan",
      "Pinsir"
    ]
  },
  {
    "name": "Comet Punch",
    "type": "Normal",
    "waitTime": 5,
    "power": 201,
    "description": "The user unleashes a flurry of punches on enemies directly in front of itself, damaging them.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Hitmonchan"
    ]
  },
  {
    "name": "Confuse Ray",
    "type": "Ghost",
    "waitTime": 3,
    "power": 0,
    "description": "The user exposes surrounding enemies to a sinister ray, often confusing them.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ninetales",
      "Psyduck",
      "Golduck",
      "Tentacruel",
      "Haunter",
      "Gengar",
      "Starmie"
    ]
  },
  {
    "name": "Cross Chop",
    "type": "Fighting",
    "waitTime": 5,
    "power": 273,
    "description": "The user jumps toward enemies in front of itself and smacks them with a two-handed chop, damaging them. Critical hits land more easily.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Primeape",
      "Machoke",
      "Machamp",
      "Electabuzz",
      "Magmar"
    ]
  },
  {
    "name": "Crunch",
    "type": "Dark",
    "waitTime": 5,
    "power": 370,
    "description": "The user takes aim and then bites on to enemies a short distance in front of itself, damaging them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Rattata",
      "Raticate",
      "Arbok",
      "Arcanine",
      "Rhyhorn",
      "Rhydon",
      "Kangaskhan",
      "Gyarados",
      "Aerodactyl"
    ]
  },
  {
    "name": "Dazzling Gleam",
    "type": "Fairy",
    "waitTime": 5,
    "power": 146,
    "description": "The user moves about as it emits a powerful flash that damages enemies hit by it.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Clefable",
      "Kadabra",
      "Alakazam"
    ]
  },
  {
    "name": "Dig",
    "type": "Ground",
    "waitTime": 5,
    "power": 243,
    "description": "The user digs a tunnel to travel beneath the feet of enemies in front of itself, then pops out from beneath them to damage them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Sandshrew",
      "Sandslash",
      "Diglett",
      "Dugtrio",
      "Geodude",
      "Graveler",
      "Golem",
      "Pinsir",
      "Eevee",
      "Vaporeon",
      "Jolteon",
      "Flareon"
    ]
  },
  {
    "name": "Draco Meteor",
    "type": "Dragon",
    "waitTime": 5,
    "power": 377,
    "description": "The user summons several meteors down around itself, damaging enemies hit by them. Sometimes reduces the amount of damage the user deals.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Dragonite"
    ]
  },
  {
    "name": "Dragon Claw",
    "type": "Dragon",
    "waitTime": 5,
    "power": 296,
    "description": "The user gathers its strength, then charges forward while spinning, damaging enemies with its sharp claws.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charmeleon",
      "Charizard",
      "Aerodactyl"
    ]
  },
  {
    "name": "Dragon Dance",
    "type": "Dragon",
    "waitTime": 8,
    "power": 0,
    "description": "The user vigorously performs a mystic, powerful dance that raises the amount of damage it deals and its movement speed for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Seadra",
      "Gyarados",
      "Dratini",
      "Dragonair",
      "Dragonite"
    ]
  },
  {
    "name": "Dragon Pulse",
    "type": "Dragon",
    "waitTime": 7,
    "power": 188,
    "description": "The user sends a shock wave flying from its mouth, damaging enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Seadra",
      "Dragonair",
      "Dragonite"
    ]
  },
  {
    "name": "Dragon Rush",
    "type": "Dragon",
    "waitTime": 5,
    "power": 141,
    "description": "The user flies into enemies a short distance from itself with great intensity, damaging them.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Rhydon",
      "Dratini",
      "Dragonair",
      "Dragonite"
    ]
  },
  {
    "name": "Drain Punch",
    "type": "Fighting",
    "waitTime": 9,
    "power": 223,
    "description": "The user fires a punch at enemies directly in front of itself, damaging them. It also absorbs power with its fist, restoring its own HP.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Hitmonchan"
    ]
  },
  {
    "name": "Draining Kiss",
    "type": "Fairy",
    "waitTime": 9,
    "power": 165,
    "description": "The user kisses enemies directly in front of itself and damages them. Part of the damage dealt restores the user's HP.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Jynx"
    ]
  },
  {
    "name": "Drill Peck",
    "type": "Flying",
    "waitTime": 5,
    "power": 321,
    "description": "The user attacks enemies directly in front of itself with its sharp beak, damaging them.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Fearow",
      "Doduo",
      "Dodrio",
      "Zapdos"
    ]
  },
  {
    "name": "Dynamic Punch",
    "type": "Fighting",
    "waitTime": 5,
    "power": 87,
    "description": "The user punches enemies directly in front of itself with its full, concentrated power. Sometimes confuses enemies.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Wigglytuff",
      "Poliwrath",
      "Machamp",
      "Hitmonchan",
      "Electabuzz"
    ]
  },
  {
    "name": "Earthquake",
    "type": "Ground",
    "waitTime": 5,
    "power": 390,
    "description": "The user causes an earthquake that damages surrounding enemies.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Arbok",
      "Sandslash",
      "Nidoking",
      "Dugtrio",
      "Golem",
      "Marowak",
      "Rhydon",
      "Pinsir",
      "Tauros",
      "Aerodactyl",
      "Snorlax",
      "Dragonair",
      "Dragonite"
    ]
  },
  {
    "name": "Egg Bomb",
    "type": "Normal",
    "waitTime": 5,
    "power": 201,
    "description": "The user scatters eggs around itself, damaging enemies hit by them.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Exeggutor",
      "Chansey"
    ]
  },
  {
    "name": "Electric Terrain",
    "type": "Electric",
    "waitTime": 5,
    "power": 0,
    "description": "The user gathers electrical power beneath itself, raising the damage it deals for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Raichu",
      "Magneton"
    ]
  },
  {
    "name": "Electroweb",
    "type": "Electric",
    "waitTime": 2,
    "power": 0,
    "description": "The user spreads an electric net out directly in front of itself, lowering the movement speed of enemies hit by it for a while.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Metapod",
      "Butterfree",
      "Kakuna",
      "Beedrill",
      "Magnemite",
      "Magneton",
      "Electabuzz"
    ]
  },
  {
    "name": "Ember",
    "type": "Fire",
    "waitTime": 7,
    "power": 109,
    "description": "The user fires sparks in front of itself that split and run in three directions when they hit the ground. Deals damage to enemies they hit. Sometimes burns enemies.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charmander",
      "Charmeleon",
      "Charizard",
      "Vulpix",
      "Ninetales",
      "Growlithe",
      "Arcanine",
      "Magmar",
      "Flareon",
      "Moltres"
    ]
  },
  {
    "name": "Explosion",
    "type": "Normal",
    "waitTime": 5,
    "power": 683,
    "description": "The user causes a tremendous explosion, dealing huge damage to surrounding enemies. The trade-off is that the user takes enough damage to knock itself out.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Golem",
      "Magneton",
      "Electrode",
      "Weezing"
    ]
  },
  {
    "name": "Extreme Speed",
    "type": "Normal",
    "waitTime": 5,
    "power": 130,
    "description": "The user charges into enemies in front of itself with blinding speed, damaging them.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Arcanine",
      "Dratini",
      "Dragonair",
      "Dragonite"
    ]
  },
  {
    "name": "Fire Blast",
    "type": "Fire",
    "waitTime": 5,
    "power": 179,
    "description": "The user sprays an all-consuming fire on the ground, damaging enemies hit by it and sometimes burning them.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charizard",
      "Ninetales",
      "Arcanine",
      "Rapidash",
      "Magmar",
      "Flareon",
      "Moltres"
    ]
  },
  {
    "name": "Fire Punch",
    "type": "Fire",
    "waitTime": 5,
    "power": 229,
    "description": "The user imbues its fist with the power of flames, and strikes enemies directly in front of it with a burning punch. Deals damage and sometimes burns enemies.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charmander",
      "Charmeleon",
      "Charizard",
      "Muk",
      "Hitmonchan"
    ]
  },
  {
    "name": "Fire Spin",
    "type": "Fire",
    "waitTime": 5,
    "power": 97,
    "description": "The user creates flames all around itself and fires them off in a spiral. Deals damage to enemies they hit. Sometimes burns enemies.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charmander",
      "Charmeleon",
      "Charizard",
      "Ponyta",
      "Rapidash",
      "Moltres"
    ]
  },
  {
    "name": "Flail",
    "type": "Normal",
    "waitTime": 5,
    "power": 130,
    "description": "The user flails about, damaging enemies it hits.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Persian",
      "Poliwag",
      "Poliwhirl",
      "Poliwrath",
      "Geodude",
      "Graveler",
      "Golem",
      "Doduo",
      "Dodrio",
      "Krabby",
      "Kingler",
      "Chansey",
      "Goldeen",
      "Seaking",
      "Magikarp",
      "Gyarados",
      "Eevee",
      "Vaporeon",
      "Jolteon",
      "Flareon"
    ]
  },
  {
    "name": "Flame Charge",
    "type": "Fire",
    "waitTime": 5,
    "power": 0,
    "description": "The user stores up the power of flames, raising the damage it deals for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charizard",
      "Vulpix",
      "Ninetales",
      "Growlithe",
      "Arcanine",
      "Ponyta",
      "Rapidash"
    ]
  },
  {
    "name": "Flame Wheel",
    "type": "Fire",
    "waitTime": 5,
    "power": 57,
    "description": "The user cloaks itself in fire and charges forward, damaging enemies it hits and sometimes burning them.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Raticate",
      "Growlithe",
      "Arcanine",
      "Rapidash"
    ]
  },
  {
    "name": "Flamethrower",
    "type": "Fire",
    "waitTime": 5,
    "power": 94,
    "description": "The user continuously breathes out long flames for a while. Deals damage to enemies as long as they remain in the flames. Sometimes burns enemies.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charmeleon",
      "Charizard",
      "Vulpix",
      "Ninetales",
      "Growlithe",
      "Arcanine",
      "Koffing",
      "Weezing",
      "Magmar",
      "Tauros",
      "Flareon",
      "Porygon",
      "Moltres"
    ]
  },
  {
    "name": "Flare Blitz",
    "type": "Fire",
    "waitTime": 5,
    "power": 128,
    "description": "The user creates a path of flames in front of itself and charges forward along it. Deals damage to enemies. Sometimes burns enemies.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charizard",
      "Arcanine",
      "Rapidash",
      "Magmar",
      "Flareon"
    ]
  },
  {
    "name": "Flash",
    "type": "Normal",
    "waitTime": 2,
    "power": 0,
    "description": "The user suddenly flashes a bright light at surrounding enemies, often lowering their movement speed.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Clefairy",
      "Clefable",
      "Jigglypuff",
      "Wigglytuff",
      "Oddish",
      "Gloom",
      "Vileplume",
      "Venonat",
      "Venomoth",
      "Abra",
      "Kadabra",
      "Alakazam",
      "Drowzee",
      "Hypno",
      "Exeggcute",
      "Exeggutor",
      "Staryu",
      "Starmie",
      "Jynx"
    ]
  },
  {
    "name": "Flash Cannon",
    "type": "Steel",
    "waitTime": 7,
    "power": 170,
    "description": "The user focuses all of its light energy into a single point and fires a beam in front of itself, sometimes raising the amount of damage enemies take.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Magnemite",
      "Magneton",
      "Onix",
      "Seadra",
      "Staryu",
      "Starmie",
      "Mew"
    ]
  },
  {
    "name": "Flatter",
    "type": "Dark",
    "waitTime": 6,
    "power": 0,
    "description": "The user flatters enemies in front of itself, which confuses them but raises the amount of damage they deal and reduces the amount of damage they take.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Nidoran♀",
      "Nidorina",
      "Nidoqueen",
      "Hypno"
    ]
  },
  {
    "name": "Fly",
    "type": "Flying",
    "waitTime": 5,
    "power": 243,
    "description": "The user flies toward enemies far in front of itself, then swoops down to deal damage to them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Spearow",
      "Fearow",
      "Aerodactyl"
    ]
  },
  {
    "name": "Focus Energy",
    "type": "Normal",
    "waitTime": 5,
    "power": 0,
    "description": "The user takes a deep breath and focuses, raising the amount of damage it deals for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Rattata",
      "Raticate",
      "Nidoran♀",
      "Nidorina",
      "Nidoqueen",
      "Cubone",
      "Marowak",
      "Hitmonlee",
      "Kangaskhan",
      "Pinsir"
    ]
  },
  {
    "name": "Follow Me",
    "type": "Normal",
    "waitTime": 2,
    "power": 0,
    "description": "The user grabs the attention of surrounding enemies, forcing them to target it.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Clefairy",
      "Clefable",
      "Mr. Mime",
      "Magmar"
    ]
  },
  {
    "name": "Fury Swipes",
    "type": "Normal",
    "waitTime": 5,
    "power": 146,
    "description": "The user repeatedly swipes at enemies directly in front of itself, damaging them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Raticate",
      "Sandslash",
      "Meowth",
      "Persian",
      "Mankey",
      "Primeape"
    ]
  },
  {
    "name": "Giga Impact",
    "type": "Normal",
    "waitTime": 5,
    "power": 176,
    "description": "The user focuses every bit of its power and charges toward enemies in front of itself, dealing huge damage to them.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Raichu",
      "Kingler",
      "Tauros",
      "Snorlax",
      "Mewtwo",
      "Mew"
    ]
  },
  {
    "name": "Growl",
    "type": "Normal",
    "waitTime": 4,
    "power": 0,
    "description": "The user growls in an endearing way, making surrounding enemies less wary and often reducing the amount of damage they deal.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Spearow",
      "Fearow",
      "Nidoran♀",
      "Nidorina",
      "Nidoqueen",
      "Nidorino",
      "Nidoking",
      "Diglett",
      "Dugtrio",
      "Meowth",
      "Persian",
      "Slowpoke",
      "Slowbro",
      "Doduo",
      "Dodrio",
      "Seel",
      "Dewgong",
      "Cubone",
      "Marowak",
      "Lapras",
      "Eevee",
      "Vaporeon",
      "Jolteon",
      "Flareon"
    ]
  },
  {
    "name": "Gust",
    "type": "Flying",
    "waitTime": 7,
    "power": 61,
    "description": "The user sends an intense gust of wind out in front of itself that whirls around and damages enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pidgey",
      "Pidgeotto",
      "Pidgeot",
      "Zubat",
      "Golbat",
      "Venomoth",
      "Farfetch'd"
    ]
  },
  {
    "name": "Harden",
    "type": "Normal",
    "waitTime": 5,
    "power": 0,
    "description": "The user stiffens all the muscles in its body, lowering the damage it takes for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Metapod",
      "Butterfree",
      "Kakuna",
      "Beedrill",
      "Geodude",
      "Graveler",
      "Golem",
      "Onix",
      "Krabby",
      "Kingler",
      "Pinsir",
      "Snorlax"
    ]
  },
  {
    "name": "Heat Wave",
    "type": "Fire",
    "waitTime": 7,
    "power": 123,
    "description": "The user exhales hot breath in front of itself, damaging enemies hit by it and sometimes burning them.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pidgeot",
      "Ninetales",
      "Farfetch'd",
      "Moltres",
      "Mew"
    ]
  },
  {
    "name": "High Jump Kick",
    "type": "Fighting",
    "waitTime": 5,
    "power": 402,
    "description": "After charging toward enemies in front of itself, the user jumps up and deals damage with a knee kick. The user also takes recoil damage.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Hitmonlee"
    ]
  },
  {
    "name": "Hurricane",
    "type": "Flying",
    "waitTime": 5,
    "power": 105,
    "description": "The user whips up an intense wind around itself, damaging surrounding enemies and sometimes confusing them.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pidgeotto",
      "Pidgeot",
      "Articuno"
    ]
  },
  {
    "name": "Hydro Pump",
    "type": "Water",
    "waitTime": 5,
    "power": 213,
    "description": "The user shoots four pillars of water up from the ground and sends them out in front of itself. Deals damage to enemies hit by them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Blastoise",
      "Golduck",
      "Tentacruel",
      "Seadra",
      "Starmie",
      "Lapras",
      "Vaporeon",
      "Omastar"
    ]
  },
  {
    "name": "Hyper Beam",
    "type": "Normal",
    "waitTime": 10,
    "power": 300,
    "description": "The user stores up power and then fires a tremendous beam at enemies. Deals severe damage to enemies it hits.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Victreebel",
      "Starmie",
      "Tauros",
      "Gyarados",
      "Porygon",
      "Dragonite",
      "Mewtwo",
      "Mew"
    ]
  },
  {
    "name": "Hypnosis",
    "type": "Psychic",
    "waitTime": 5,
    "power": 0,
    "description": "The user employs hypnotic suggestion, often making enemies in front of itself fall asleep.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Haunter",
      "Gengar",
      "Hypno",
      "Mr. Mime"
    ]
  },
  {
    "name": "Ice Beam",
    "type": "Ice",
    "waitTime": 7,
    "power": 133,
    "description": "The user fires an icy-cold beam at enemies in front of itself. Deals damage to enemies and sometimes freezes them.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Golduck",
      "Tentacruel",
      "Shellder",
      "Cloyster",
      "Seadra",
      "Staryu",
      "Starmie",
      "Jynx",
      "Lapras",
      "Porygon",
      "Omastar",
      "Articuno"
    ]
  },
  {
    "name": "Ice Punch",
    "type": "Ice",
    "waitTime": 5,
    "power": 175,
    "description": "The user chills its fist and unleashes a freezing punch on enemies directly in front of it. Sometimes freezes enemies.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Poliwrath",
      "Slowpoke",
      "Slowbro",
      "Hitmonchan"
    ]
  },
  {
    "name": "Icicle Crash",
    "type": "Ice",
    "waitTime": 5,
    "power": 143,
    "description": "The user drops frigid icicles in front of itself. Deals damage to enemies hit by them and sometimes freezes them.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Cloyster",
      "Lapras"
    ]
  },
  {
    "name": "Icy Wind",
    "type": "Ice",
    "waitTime": 7,
    "power": 126,
    "description": "The user sends a freezing gust of chilled air at enemies in front of itself, damaging them. Sometimes lowers enemies' movement speed.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Psyduck",
      "Golduck",
      "Tentacruel",
      "Cloyster",
      "Horsea",
      "Seadra",
      "Staryu",
      "Starmie",
      "Lapras",
      "Omanyte",
      "Omastar",
      "Articuno"
    ]
  },
  {
    "name": "Iron Defense",
    "type": "Steel",
    "waitTime": 5,
    "power": 0,
    "description": "The user hardens its skin until it's like iron, lowering the damage it takes for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Metapod",
      "Butterfree",
      "Kakuna",
      "Beedrill",
      "Shellder",
      "Cloyster"
    ]
  },
  {
    "name": "Iron Tail",
    "type": "Steel",
    "waitTime": 5,
    "power": 67,
    "description": "The user swings its steel-hard tail, damaging surrounding enemies and sometimes raising the amount of damage they take.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Raticate",
      "Arbok",
      "Pikachu",
      "Raichu",
      "Nidoran♂",
      "Nidorino",
      "Nidoking",
      "Onix",
      "Lickitung",
      "Rhyhorn",
      "Rhydon",
      "Tauros",
      "Porygon"
    ]
  },
  {
    "name": "Lava Plume",
    "type": "Fire",
    "waitTime": 5,
    "power": 132,
    "description": "The user spouts scarlet flames all around itself. Deals damage to enemies around it. Sometimes burns enemies.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Koffing",
      "Weezing",
      "Magmar",
      "Flareon",
      "Moltres"
    ]
  },
  {
    "name": "Leech Life",
    "type": "Bug",
    "waitTime": 9,
    "power": 185,
    "description": "The user drains the blood of enemies directly in front of itself, damaging them. Part of the damage dealt is absorbed to restore the user's HP.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Zubat",
      "Golbat"
    ]
  },
  {
    "name": "Leech Seed",
    "type": "Grass",
    "waitTime": 9,
    "power": 103,
    "description": "The user plants a seed on the ground in front of itself. Enemies in range are gradually damaged. Part of the damage dealt is absorbed to restore the user's HP.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ivysaur",
      "Venusaur",
      "Paras",
      "Parasect",
      "Exeggcute",
      "Exeggutor",
      "Tangela"
    ]
  },
  {
    "name": "Leer",
    "type": "Normal",
    "waitTime": 3,
    "power": 0,
    "description": "The user glares at nearby enemies to intimidate them, often raising the amount of damage they take.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Spearow",
      "Fearow",
      "Ekans",
      "Arbok",
      "Mankey",
      "Primeape",
      "Krabby",
      "Kingler",
      "Cubone",
      "Marowak",
      "Kangaskhan",
      "Moltres"
    ]
  },
  {
    "name": "Lick",
    "type": "Ghost",
    "waitTime": 5,
    "power": 233,
    "description": "The user licks enemies all around itself with its long tongue, damaging them. Sometimes paralyzes enemies.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Seel",
      "Dewgong",
      "Muk",
      "Gastly",
      "Haunter",
      "Gengar",
      "Lickitung"
    ]
  },
  {
    "name": "Light Screen",
    "type": "Psychic",
    "waitTime": 3,
    "power": 0,
    "description": "The user creates a wall of light, making it harder for it to be affected by negative effects for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Clefairy",
      "Clefable",
      "Paras",
      "Parasect",
      "Psyduck",
      "Golduck",
      "Abra",
      "Kadabra",
      "Alakazam",
      "Slowpoke",
      "Slowbro",
      "Magneton",
      "Drowzee",
      "Hypno",
      "Electrode",
      "Chansey",
      "Mr. Mime",
      "Zapdos"
    ]
  },
  {
    "name": "Lunge",
    "type": "Bug",
    "waitTime": 5,
    "power": 180,
    "description": "The user lunges toward enemies in front of itself, damaging them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Caterpie",
      "Metapod",
      "Butterfree",
      "Weedle",
      "Kakuna",
      "Beedrill",
      "Scyther"
    ]
  },
  {
    "name": "Meditate",
    "type": "Psychic",
    "waitTime": 5,
    "power": 0,
    "description": "The user meditates to awaken the power deep within its body, raising the amount of damage it deals for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Primeape",
      "Hypno",
      "Hitmonlee",
      "Mr. Mime",
      "Jynx",
      "Electabuzz"
    ]
  },
  {
    "name": "Mega Drain",
    "type": "Grass",
    "waitTime": 9,
    "power": 165,
    "description": "The user attacks enemies in front of itself, dealing damage to them. Some of the damage dealt is absorbed by the user, restoring its HP.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Venusaur",
      "Vileplume",
      "Gengar",
      "Tangela"
    ]
  },
  {
    "name": "Mega Punch",
    "type": "Normal",
    "waitTime": 5,
    "power": 561,
    "description": "After approaching enemies in front of itself, the user slugs enemies directly in front of itself with a muscle-packed punch, damaging them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Jigglypuff",
      "Wigglytuff",
      "Primeape",
      "Poliwhirl",
      "Poliwrath",
      "Machoke",
      "Machamp",
      "Hitmonchan",
      "Lickitung",
      "Chansey",
      "Kangaskhan",
      "Snorlax"
    ]
  },
  {
    "name": "Megahorn",
    "type": "Bug",
    "waitTime": 5,
    "power": 513,
    "description": "Using its tough and impressive horn, the user rams into enemies in front of itself with no letup, dealing huge damage to them.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Nidoking",
      "Rapidash",
      "Rhydon",
      "Seaking"
    ]
  },
  {
    "name": "Metal Claw",
    "type": "Steel",
    "waitTime": 5,
    "power": 211,
    "description": "The user rakes enemies in front of itself with its steel claws, dealing damage. Sometimes raises the amount of damage the user deals.",
    "stones": [
      "Broadburst Stone",
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charmeleon",
      "Charizard",
      "Sandshrew",
      "Sandslash",
      "Parasect",
      "Kingler"
    ]
  },
  {
    "name": "Metal Sound",
    "type": "Steel",
    "waitTime": 3,
    "power": 0,
    "description": "Enemies near the user are forced to listen to a horrible sound like metal scraping, often raising the amount of damage they take.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Magnemite",
      "Magneton",
      "Kabuto",
      "Kabutops",
      "Zapdos"
    ]
  },
  {
    "name": "Mud Bomb",
    "type": "Ground",
    "waitTime": 5,
    "power": 215,
    "description": "The user throws a lump of mud in front of itself that splits open when it hits the ground, damaging surrounding enemies and sometimes raising the amount of damage they take.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ekans",
      "Arbok",
      "Diglett",
      "Dugtrio",
      "Golduck"
    ]
  },
  {
    "name": "Mud-Slap",
    "type": "Ground",
    "waitTime": 7,
    "power": 56,
    "description": "The user hurls mud in three directions, dealing damage to enemies hit by it. Sometimes reduces their movement speed.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pidgeotto",
      "Pidgeot",
      "Ekans",
      "Arbok",
      "Nidoran♀",
      "Nidorina",
      "Nidoqueen",
      "Diglett",
      "Dugtrio"
    ]
  },
  {
    "name": "Nasty Plot",
    "type": "Dark",
    "waitTime": 5,
    "power": 0,
    "description": "The user stimulates its brain by thinking bad thoughts, raising the amount of damage it deals for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Golbat",
      "Persian",
      "Mr. Mime"
    ]
  },
  {
    "name": "Night Slash",
    "type": "Dark",
    "waitTime": 5,
    "power": 83,
    "description": "The user dashes forward, slashing surrounding enemies and damaging them. Critical hits land more easily.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Sandslash",
      "Persian",
      "Primeape",
      "Farfetch'd",
      "Scyther",
      "Kabutops"
    ]
  },
  {
    "name": "Outrage",
    "type": "Dragon",
    "waitTime": 5,
    "power": 104,
    "description": "The user rampages about, attacking and damaging any enemies in its path. Sometimes confuses the user.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Marowak",
      "Kangaskhan",
      "Tauros",
      "Gyarados",
      "Snorlax",
      "Dragonite"
    ]
  },
  {
    "name": "Petal Dance",
    "type": "Grass",
    "waitTime": 5,
    "power": 156,
    "description": "The user spins in place, scattering petals that deal damage to enemies around it.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Bulbasaur",
      "Ivysaur",
      "Venusaur",
      "Oddish",
      "Gloom",
      "Vileplume"
    ]
  },
  {
    "name": "Pin Missile",
    "type": "Bug",
    "waitTime": 7,
    "power": 110,
    "description": "The user shoots three sharp spikes in front of itself, damaging enemies hit by them.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Beedrill",
      "Jolteon"
    ]
  },
  {
    "name": "Play Rough",
    "type": "Fairy",
    "waitTime": 5,
    "power": 98,
    "description": "The user plays rough with enemies in front of itself, damaging them. Sometimes lowers the damage enemies deal.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Wigglytuff",
      "Persian"
    ]
  },
  {
    "name": "Poison Powder",
    "type": "Poison",
    "waitTime": 4,
    "power": 67,
    "description": "The user scatters poison powder in front of itself, often poisoning enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ivysaur",
      "Venusaur",
      "Oddish",
      "Gloom",
      "Vileplume",
      "Paras",
      "Parasect",
      "Venonat",
      "Venomoth"
    ]
  },
  {
    "name": "Poison Sting",
    "type": "Poison",
    "waitTime": 7,
    "power": 107,
    "description": "The user fires a poisonous stinger at enemies in front of itself. Sometimes poisons enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Weedle",
      "Kakuna",
      "Beedrill",
      "Ekans",
      "Arbok",
      "Nidorina",
      "Nidoqueen",
      "Tentacool",
      "Tentacruel"
    ]
  },
  {
    "name": "Power-Up Punch",
    "type": "Fighting",
    "waitTime": 5,
    "power": 64,
    "description": "The user delivers a punch with its hard fist to enemies directly in front of itself, damaging them. Often raises the amount of damage the user deals.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Poliwrath",
      "Machamp",
      "Muk",
      "Hitmonchan",
      "Lickitung",
      "Kangaskhan",
      "Electabuzz"
    ]
  },
  {
    "name": "Psybeam",
    "type": "Psychic",
    "waitTime": 7,
    "power": 69,
    "description": "The user sends peculiar rays of light out in three directions, damaging enemies hit by them. Sometimes confuses enemies.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Parasect",
      "Venonat",
      "Venomoth",
      "Golduck",
      "Abra",
      "Kadabra",
      "Alakazam",
      "Drowzee",
      "Hypno",
      "Jynx",
      "Porygon"
    ]
  },
  {
    "name": "Psychic",
    "type": "Psychic",
    "waitTime": 7,
    "power": 121,
    "description": "The user creates a large, mysterious light and fires it out, dealing damage to enemies hit by it. Sometimes raises the amount of damage they take.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Clefable",
      "Venomoth",
      "Golduck",
      "Kadabra",
      "Alakazam",
      "Hypno",
      "Exeggcute",
      "Exeggutor",
      "Starmie",
      "Mr. Mime",
      "Jynx",
      "Mewtwo",
      "Mew"
    ]
  },
  {
    "name": "Psycho Cut",
    "type": "Psychic",
    "waitTime": 5,
    "power": 311,
    "description": "After moving forward, the user deals damage to enemies with blades formed by psychic power. Critical hits land more easily.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Alakazam",
      "Mewtwo"
    ]
  },
  {
    "name": "Psystrike",
    "type": "Psychic",
    "waitTime": 5,
    "power": 129,
    "description": "The user creates a large orb of light in front of itself. The orb then splits into many smaller ones that fly out in all directions, dealing damage to surrounding enemies.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Mewtwo"
    ]
  },
  {
    "name": "Rage Powder",
    "type": "Bug",
    "waitTime": 2,
    "power": 0,
    "description": "The user scatters a cloud of irritating powder on itself, causing surrounding enemies to target it.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Butterfree",
      "Paras",
      "Parasect",
      "Tangela"
    ]
  },
  {
    "name": "Razor Leaf",
    "type": "Grass",
    "waitTime": 7,
    "power": 118,
    "description": "The user launches sharp-edged leaves to slash at enemies, damaging them. Critical hits land more easily.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Bellsprout",
      "Weepinbell",
      "Victreebel"
    ]
  },
  {
    "name": "Recover",
    "type": "Normal",
    "waitTime": 9,
    "power": 0,
    "description": "Restoring its own cells, the user restores its HP.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Alakazam",
      "Porygon",
      "Mewtwo",
      "Mew"
    ]
  },
  {
    "name": "Rest",
    "type": "Psychic",
    "waitTime": 9,
    "power": 0,
    "description": "The user rests in place, greatly restoring its HP.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Wigglytuff",
      "Slowbro",
      "Dewgong",
      "Tangela",
      "Kangaskhan",
      "Lapras",
      "Snorlax"
    ]
  },
  {
    "name": "Roar",
    "type": "Normal",
    "waitTime": 2,
    "power": 0,
    "description": "The user roars intensely, blowing away surrounding enemies.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Vulpix",
      "Ninetales",
      "Persian",
      "Growlithe",
      "Arcanine",
      "Onix",
      "Rhyhorn",
      "Rhydon"
    ]
  },
  {
    "name": "Rock Blast",
    "type": "Rock",
    "waitTime": 7,
    "power": 168,
    "description": "The user hurls hard rocks in front of itself, damaging enemies hit by them.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Cloyster",
      "Omastar"
    ]
  },
  {
    "name": "Rock Polish",
    "type": "Rock",
    "waitTime": 2,
    "power": 0,
    "description": "The user polishes its body to reduce drag, raising its movement speed for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Golem",
      "Onix",
      "Rhydon",
      "Omastar"
    ]
  },
  {
    "name": "Rock Smash",
    "type": "Fighting",
    "waitTime": 1,
    "power": 29,
    "description": "The user unleashes its fury, damaging enemies in a broad area nearby and destroying surrounding trees and rocks.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Nidoran♂",
      "Nidorino",
      "Nidoking",
      "Machop",
      "Machoke",
      "Machamp",
      "Onix",
      "Hitmonlee",
      "Hitmonchan",
      "Lickitung",
      "Rhydon",
      "Chansey",
      "Scyther",
      "Pinsir"
    ]
  },
  {
    "name": "Rock Throw",
    "type": "Rock",
    "waitTime": 5,
    "power": 234,
    "description": "The user picks up two rocks and hurls them in front of itself, damaging enemies hit by them.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Dugtrio",
      "Onix"
    ]
  },
  {
    "name": "Rock Tomb",
    "type": "Rock",
    "waitTime": 5,
    "power": 212,
    "description": "The user drops boulders directly in front of itself, damaging enemies hit by them and sometimes lowering their movement speed.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ekans",
      "Arbok",
      "Nidorino",
      "Nidoking",
      "Dugtrio",
      "Muk",
      "Onix",
      "Marowak",
      "Kangaskhan",
      "Pinsir",
      "Kabutops",
      "Aerodactyl"
    ]
  },
  {
    "name": "Rolling Kick",
    "type": "Fighting",
    "waitTime": 5,
    "power": 156,
    "description": "The user kicks as it spins in place, dealing damage to surrounding enemies.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Machop",
      "Machoke",
      "Machamp",
      "Hitmonlee"
    ]
  },
  {
    "name": "Rollout",
    "type": "Rock",
    "waitTime": 5,
    "power": 130,
    "description": "The user spins around, damaging surrounding enemies it smashes into.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Sandshrew",
      "Sandslash",
      "Clefairy",
      "Clefable",
      "Jigglypuff",
      "Wigglytuff",
      "Graveler",
      "Golem",
      "Voltorb",
      "Electrode",
      "Lickitung",
      "Snorlax"
    ]
  },
  {
    "name": "Roost",
    "type": "Flying",
    "waitTime": 9,
    "power": 0,
    "description": "The user briefly rests its body, restoring a bit of its HP.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pidgeot",
      "Golbat",
      "Farfetch'd",
      "Aerodactyl",
      "Articuno",
      "Zapdos",
      "Moltres"
    ]
  },
  {
    "name": "Sandstorm",
    "type": "Rock",
    "waitTime": 5,
    "power": 117,
    "description": "The user creates a sandstorm around itself, damaging enemies hit by it.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Sandshrew",
      "Sandslash",
      "Onix",
      "Cubone",
      "Marowak",
      "Kabutops",
      "Aerodactyl"
    ]
  },
  {
    "name": "Scratch",
    "type": "Normal",
    "waitTime": 5,
    "power": 231,
    "description": "The user rakes its hard, pointed claws over enemies directly in front of itself, damaging them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Charmander",
      "Charmeleon",
      "Charizard",
      "Rattata",
      "Raticate",
      "Sandshrew",
      "Sandslash",
      "Meowth",
      "Persian",
      "Mankey",
      "Primeape"
    ]
  },
  {
    "name": "Self-Destruct",
    "type": "Normal",
    "waitTime": 5,
    "power": 494,
    "description": "The user approaches enemies and causes an explosion, damaging all surrounding enemies. The trade-off is that the user takes enough damage to knock itself out.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Graveler",
      "Golem",
      "Voltorb",
      "Electrode",
      "Koffing",
      "Weezing"
    ]
  },
  {
    "name": "Shadow Ball",
    "type": "Ghost",
    "waitTime": 7,
    "power": 63,
    "description": "The user hurls a shadowy blob in front of itself, damaging enemies hit by it. Sometimes raises the amount of damage they take.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Alakazam",
      "Gengar",
      "Hypno",
      "Weezing",
      "Porygon",
      "Mewtwo"
    ]
  },
  {
    "name": "Shore Up",
    "type": "Ground",
    "waitTime": 9,
    "power": 0,
    "description": "The user gathers sand from beneath itself, restoring a bit of its HP.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Dugtrio"
    ]
  },
  {
    "name": "Silver Wind",
    "type": "Bug",
    "waitTime": 5,
    "power": 53,
    "description": "Scales carried by the wind swirl around the user, damaging enemies hit by them. Some or all of the user's stats sometimes rise at random.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Butterfree",
      "Venomoth",
      "Scyther"
    ]
  },
  {
    "name": "Sing",
    "type": "Normal",
    "waitTime": 3,
    "power": 0,
    "description": "The user sings to enemies around itself with its calming voice, often putting them to sleep.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Jigglypuff",
      "Wigglytuff",
      "Chansey",
      "Jynx",
      "Lapras"
    ]
  },
  {
    "name": "Sky Attack",
    "type": "Flying",
    "waitTime": 5,
    "power": 125,
    "description": "After flying up and bracing itself, the user charges at enemies directly in front of itself, damaging them. Critical hits land more easily.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pidgeot",
      "Farfetch'd",
      "Aerodactyl",
      "Articuno",
      "Zapdos",
      "Moltres"
    ]
  },
  {
    "name": "Slam",
    "type": "Normal",
    "waitTime": 5,
    "power": 211,
    "description": "The user slams nearby enemies with a long tail, vines, or the like, damaging all of them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Weepinbell",
      "Victreebel",
      "Dewgong",
      "Grimer",
      "Muk",
      "Kingler",
      "Lickitung",
      "Tangela"
    ]
  },
  {
    "name": "Sludge Bomb",
    "type": "Poison",
    "waitTime": 5,
    "power": 173,
    "description": "The user shoots out a glob of sludge that splits open when it hits the ground, damaging surrounding enemies. Sometimes poisons enemies.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Arbok",
      "Nidoqueen",
      "Golbat",
      "Bellsprout",
      "Weepinbell",
      "Victreebel",
      "Tentacool",
      "Tentacruel",
      "Exeggcute",
      "Exeggutor",
      "Koffing",
      "Weezing"
    ]
  },
  {
    "name": "Smog",
    "type": "Poison",
    "waitTime": 5,
    "power": 188,
    "description": "The user spews poison around itself, damaging enemies. Sometimes poisons enemies.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Gastly",
      "Haunter",
      "Gengar",
      "Koffing",
      "Weezing",
      "Magmar"
    ]
  },
  {
    "name": "Soft-Boiled",
    "type": "Normal",
    "waitTime": 9,
    "power": 0,
    "description": "The user restores its HP with the power of eggs.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Clefable",
      "Chansey"
    ]
  },
  {
    "name": "Solar Beam",
    "type": "Grass",
    "waitTime": 7,
    "power": 227,
    "description": "The user gathers light and unleashes it in front of itself, dealing damage to enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Venusaur",
      "Ninetales",
      "Vileplume",
      "Victreebel",
      "Exeggutor"
    ]
  },
  {
    "name": "Spark",
    "type": "Electric",
    "waitTime": 5,
    "power": 81,
    "description": "The user charges its body with electricity and charges toward enemies in front of itself. Sometimes paralyzes enemies.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pikachu",
      "Raichu",
      "Electrode",
      "Jolteon"
    ]
  },
  {
    "name": "Spikes",
    "type": "Ground",
    "waitTime": 5,
    "power": 221,
    "description": "The user scatters spikes in front of itself, damaging enemies that step on them.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Cloyster",
      "Omanyte",
      "Omastar"
    ]
  },
  {
    "name": "Splash",
    "type": "Normal",
    "waitTime": 3,
    "power": 56,
    "description": "The user splashes in place.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Goldeen",
      "Seaking",
      "Magikarp",
      "Gyarados"
    ]
  },
  {
    "name": "Spore",
    "type": "Grass",
    "waitTime": 9,
    "power": 0,
    "description": "The user scatters sleep-inducing spores directly in front of itself, often making enemies fall asleep.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Parasect"
    ]
  },
  {
    "name": "Stealth Rock",
    "type": "Rock",
    "waitTime": 5,
    "power": 120,
    "description": "The user creates pillars of stone from the ground, damaging enemies hit by them.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Nidoqueen",
      "Diglett",
      "Dugtrio",
      "Graveler",
      "Golem",
      "Onix"
    ]
  },
  {
    "name": "Steel Wing",
    "type": "Steel",
    "waitTime": 5,
    "power": 81,
    "description": "The user charges at enemies in front of itself and smacks them with its hard wings, dealing damage. Sometimes reduces the amount of damage the user takes.",
    "stones": [
      "Broadburst Stone",
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Fearow",
      "Farfetch'd",
      "Scyther",
      "Articuno"
    ]
  },
  {
    "name": "Stomp",
    "type": "Normal",
    "waitTime": 5,
    "power": 180,
    "description": "The user stomps on enemies in front of itself with a big foot, damaging them.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ponyta",
      "Rapidash",
      "Krabby",
      "Kingler",
      "Exeggutor",
      "Lickitung",
      "Rhyhorn",
      "Rhydon",
      "Kangaskhan"
    ]
  },
  {
    "name": "String Shot",
    "type": "Bug",
    "waitTime": 2,
    "power": 118,
    "description": "The user spews a sticky thread in three directions, creating nets that will damage enemies and often lower their movement speed.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Caterpie",
      "Metapod",
      "Butterfree",
      "Weedle",
      "Kakuna",
      "Beedrill",
      "Venonat",
      "Venomoth"
    ]
  },
  {
    "name": "Stun Spore",
    "type": "Grass",
    "waitTime": 3,
    "power": 21,
    "description": "The user scatters numbing powder directly in front of itself. Often paralyzes enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Oddish",
      "Gloom",
      "Vileplume",
      "Paras",
      "Parasect",
      "Venonat",
      "Venomoth",
      "Weepinbell",
      "Victreebel",
      "Exeggutor",
      "Tangela"
    ]
  },
  {
    "name": "Submission",
    "type": "Fighting",
    "waitTime": 5,
    "power": 130,
    "description": "The user spins toward enemies in front of itself, smashing into them. Deals damage to enemies hit by the user as it whirls around.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Mankey",
      "Primeape",
      "Machop",
      "Machoke",
      "Machamp",
      "Hitmonlee",
      "Pinsir"
    ]
  },
  {
    "name": "Substitute",
    "type": "Normal",
    "waitTime": 5,
    "power": 0,
    "description": "The user puts out a substitute for itself that enemies are forced to attack.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Tangela",
      "Mr. Mime"
    ]
  },
  {
    "name": "Sucker Punch",
    "type": "Dark",
    "waitTime": 5,
    "power": 130,
    "description": "The user briefly disappears and moves a short distance. It then charges toward enemies, damaging them.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Arbok",
      "Dugtrio",
      "Farfetch'd",
      "Gastly",
      "Haunter",
      "Gengar",
      "Electrode",
      "Hitmonlee"
    ]
  },
  {
    "name": "Supersonic",
    "type": "Normal",
    "waitTime": 3,
    "power": 0,
    "description": "The user generates odd sound waves from its body, often confusing surrounding enemies.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Nidorina",
      "Nidoqueen",
      "Zubat",
      "Golbat",
      "Venomoth",
      "Tentacruel",
      "Magnemite",
      "Magneton",
      "Cloyster",
      "Seaking",
      "Omastar"
    ]
  },
  {
    "name": "Surf",
    "type": "Water",
    "waitTime": 5,
    "power": 127,
    "description": "The user creates a wide wave and charges forward on it. Deals damage to enemies caught in the wave.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Wartortle",
      "Blastoise",
      "Poliwag",
      "Poliwhirl",
      "Poliwrath",
      "Slowbro",
      "Seel",
      "Dewgong",
      "Krabby",
      "Kingler",
      "Goldeen",
      "Seaking",
      "Kabuto",
      "Kabutops"
    ]
  },
  {
    "name": "Sweet Kiss",
    "type": "Fairy",
    "waitTime": 3,
    "power": 165,
    "description": "The user kisses enemies directly in front of itself with a sweet, angelic kiss that often confuses them.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Wigglytuff",
      "Chansey",
      "Jynx"
    ]
  },
  {
    "name": "Swords Dance",
    "type": "Normal",
    "waitTime": 5,
    "power": 0,
    "description": "With a frenetic dance to uplift the fighting spirit, the user raises the amount of damage it deals for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Sandslash",
      "Nidoqueen",
      "Vileplume",
      "Victreebel",
      "Farfetch'd",
      "Dodrio",
      "Kingler",
      "Scyther",
      "Kabutops"
    ]
  },
  {
    "name": "Synthesis",
    "type": "Grass",
    "waitTime": 5,
    "power": 0,
    "description": "The user absorbs light, raising the damage it deals for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Bulbasaur",
      "Ivysaur",
      "Venusaur",
      "Gloom",
      "Vileplume",
      "Bellsprout",
      "Weepinbell",
      "Victreebel",
      "Exeggcute",
      "Exeggutor",
      "Tangela"
    ]
  },
  {
    "name": "Tackle",
    "type": "Normal",
    "waitTime": 5,
    "power": 163,
    "description": "The user smashes into enemies in front of itself with all its might, damaging them.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Bulbasaur",
      "Ivysaur",
      "Venusaur",
      "Squirtle",
      "Wartortle",
      "Blastoise",
      "Caterpie",
      "Metapod",
      "Butterfree",
      "Weedle",
      "Kakuna",
      "Beedrill",
      "Rattata",
      "Raticate",
      "Geodude",
      "Graveler",
      "Golem",
      "Slowpoke",
      "Slowbro",
      "Grimer",
      "Muk",
      "Voltorb",
      "Electrode",
      "Magikarp",
      "Gyarados"
    ]
  },
  {
    "name": "Tailwind",
    "type": "Flying",
    "waitTime": 2,
    "power": 0,
    "description": "The user creates an intense swirling wind that raises its movement speed for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pidgey",
      "Pidgeotto",
      "Pidgeot",
      "Golbat",
      "Farfetch'd",
      "Dodrio",
      "Scyther"
    ]
  },
  {
    "name": "Take Down",
    "type": "Normal",
    "waitTime": 5,
    "power": 189,
    "description": "The user slams into enemies in front of itself with a reckless, full-body charge, damaging all enemies hit by it. The user also takes recoil damage.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ivysaur",
      "Venusaur",
      "Caterpie",
      "Metapod",
      "Butterfree",
      "Rattata",
      "Raticate",
      "Spearow",
      "Fearow",
      "Nidoran♂",
      "Nidorino",
      "Nidoking",
      "Clefairy",
      "Clefable",
      "Jigglypuff",
      "Wigglytuff",
      "Doduo",
      "Dodrio",
      "Seel",
      "Dewgong",
      "Kingler",
      "Rhyhorn",
      "Rhydon",
      "Chansey",
      "Kangaskhan",
      "Goldeen",
      "Seaking",
      "Pinsir",
      "Tauros",
      "Eevee",
      "Vaporeon",
      "Jolteon",
      "Flareon",
      "Aerodactyl",
      "Snorlax"
    ]
  },
  {
    "name": "Taunt",
    "type": "Dark",
    "waitTime": 2,
    "power": 0,
    "description": "The user taunts surrounding enemies, forcing them to target it.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Raticate",
      "Nidoking",
      "Zubat",
      "Golbat",
      "Meowth",
      "Persian",
      "Mankey",
      "Primeape",
      "Muk",
      "Drowzee",
      "Hypno",
      "Voltorb",
      "Electrode",
      "Mr. Mime",
      "Gyarados"
    ]
  },
  {
    "name": "Teleport",
    "type": "Psychic",
    "waitTime": 3,
    "power": 0,
    "description": "The user utilizes its psychic powers to teleport.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Abra",
      "Kadabra",
      "Alakazam",
      "Mew"
    ]
  },
  {
    "name": "Thunder",
    "type": "Electric",
    "waitTime": 5,
    "power": 204,
    "description": "The user strikes the area in front of itself with a lightning bolt. Deals damage to nearby enemies. Sometimes paralyzes enemies.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Raichu",
      "Magneton",
      "Electabuzz",
      "Jolteon",
      "Zapdos",
      "Mew"
    ]
  },
  {
    "name": "Thunder Punch",
    "type": "Electric",
    "waitTime": 5,
    "power": 194,
    "description": "The user charges its fist with electricity and unleashes a shocking punch on enemies directly in front of itself, sometimes paralyzing them.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Hitmonchan",
      "Electabuzz"
    ]
  },
  {
    "name": "Thunder Shock",
    "type": "Electric",
    "waitTime": 5,
    "power": 173,
    "description": "After storing up electricity, the user fires it toward enemies in front of itself, dealing damage to them. Sometimes paralyzes enemies.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pikachu",
      "Raichu",
      "Voltorb",
      "Electrode",
      "Electabuzz",
      "Zapdos"
    ]
  },
  {
    "name": "Thunderbolt",
    "type": "Electric",
    "waitTime": 5,
    "power": 80,
    "description": "The user discharges tremendous electricity all around itself. Deals damage to enemies around the user. Sometimes paralyzes enemies.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pikachu",
      "Raichu",
      "Magneton",
      "Electabuzz",
      "Tauros",
      "Jolteon",
      "Porygon",
      "Zapdos",
      "Mewtwo"
    ]
  },
  {
    "name": "Toxic",
    "type": "Poison",
    "waitTime": 4,
    "power": 59,
    "description": "The user sprays a powerful poison around itself, often poisoning enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Venusaur",
      "Nidoran♂",
      "Nidorino",
      "Nidoking",
      "Grimer",
      "Muk",
      "Haunter",
      "Gengar",
      "Weezing"
    ]
  },
  {
    "name": "Transform",
    "type": "Normal",
    "waitTime": 0,
    "power": 0,
    "description": "When Ditto transforms into another Pokémon, this changes into a move that Pokémon can learn.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ditto"
    ]
  },
  {
    "name": "Transform",
    "type": "Normal",
    "waitTime": 0,
    "power": 0,
    "description": "When Ditto transforms into another Pokémon, this changes into a move that Pokémon can learn.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ditto"
    ]
  },
  {
    "name": "Transform",
    "type": "Normal",
    "waitTime": 0,
    "power": 0,
    "description": "When Ditto transforms into another Pokémon, this changes into a move that Pokémon can learn.",
    "stones": [
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ditto"
    ]
  },
  {
    "name": "Tri Attack",
    "type": "Normal",
    "waitTime": 5,
    "power": 81,
    "description": "The user's body is imbued with three powers as it attacks enemies in front of itself, damaging them. Sometimes burns, paralyzes, or freezes enemies.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Fearow",
      "Dodrio",
      "Porygon",
      "Mew"
    ]
  },
  {
    "name": "Twister",
    "type": "Dragon",
    "waitTime": 7,
    "power": 115,
    "description": "The user whips up several tornadoes and sends them out in front of itself, damaging enemies hit by them.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pidgey",
      "Pidgeotto",
      "Pidgeot",
      "Horsea",
      "Seadra",
      "Staryu",
      "Starmie",
      "Dragonair",
      "Dragonite"
    ]
  },
  {
    "name": "U-turn",
    "type": "Bug",
    "waitTime": 5,
    "power": 243,
    "description": "After attacking surrounding enemies, the user moves back to dodge enemies' counterattacks.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Butterfree",
      "Fearow",
      "Meowth",
      "Persian",
      "Farfetch'd",
      "Scyther",
      "Articuno"
    ]
  },
  {
    "name": "Venom Drench",
    "type": "Poison",
    "waitTime": 5,
    "power": 118,
    "description": "The user spews poison in front of itself, sometimes raising the amount of damage enemies take.",
    "stones": [
      "Scattershot Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Nidorina",
      "Nidoqueen",
      "Golbat",
      "Grimer",
      "Muk",
      "Weezing"
    ]
  },
  {
    "name": "Vine Whip",
    "type": "Grass",
    "waitTime": 5,
    "power": 237,
    "description": "The user strikes enemies in front of itself with whiplike vines. Deals damage to enemies hit by them.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Bulbasaur",
      "Ivysaur",
      "Venusaur",
      "Weepinbell",
      "Victreebel",
      "Tangela"
    ]
  },
  {
    "name": "Volt Tackle",
    "type": "Electric",
    "waitTime": 6,
    "power": 110,
    "description": "After electrifying itself and charging toward enemies, the user jumps and discharges electricity, damaging enemies hit by it and sometimes paralyzing them.",
    "stones": [
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pikachu",
      "Raichu"
    ]
  },
  {
    "name": "Waterfall",
    "type": "Water",
    "waitTime": 5,
    "power": 252,
    "description": "The user approaches enemies in front of itself and creates a pillar of water beneath them. This deals damage to enemies it hits.",
    "stones": [
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Wartortle",
      "Blastoise",
      "Poliwag",
      "Poliwhirl",
      "Poliwrath",
      "Seaking",
      "Gyarados",
      "Vaporeon",
      "Kabuto",
      "Kabutops"
    ]
  },
  {
    "name": "Whirlpool",
    "type": "Water",
    "waitTime": 5,
    "power": 94,
    "description": "The user creates a whirlpool around itself. Deals damage to enemies around the user.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Squirtle",
      "Wartortle",
      "Blastoise",
      "Psyduck",
      "Golduck",
      "Tentacool",
      "Tentacruel",
      "Horsea",
      "Seadra",
      "Lapras",
      "Vaporeon",
      "Omanyte",
      "Omastar"
    ]
  },
  {
    "name": "Whirlwind",
    "type": "Normal",
    "waitTime": 2,
    "power": 0,
    "description": "The user whips up a strong wind around itself, blowing away enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Scattershot Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Pidgey",
      "Pidgeotto",
      "Pidgeot",
      "Fearow",
      "Zubat",
      "Golbat"
    ]
  },
  {
    "name": "Will-O-Wisp",
    "type": "Fire",
    "waitTime": 3,
    "power": 19,
    "description": "The user drapes itself with sinister flames and attacks enemies directly in front of it. Often burns enemies.",
    "stones": [
      "Broadburst Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Ninetales",
      "Rapidash",
      "Gengar",
      "Weezing",
      "Magmar",
      "Moltres"
    ]
  },
  {
    "name": "Withdraw",
    "type": "Water",
    "waitTime": 5,
    "power": 0,
    "description": "The user withdraws into its hard shell, reducing the amount of damage it takes for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Squirtle",
      "Wartortle",
      "Blastoise",
      "Slowbro",
      "Shellder",
      "Cloyster",
      "Omanyte",
      "Omastar",
      "Kabuto",
      "Kabutops"
    ]
  },
  {
    "name": "Work Up",
    "type": "Normal",
    "waitTime": 8,
    "power": 0,
    "description": "The user is roused, raising the amount of damage it deals and reducing the amount of damage it takes for a while.",
    "stones": [
      "Sharing Stone",
      "Stay Strong Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Machoke",
      "Machamp",
      "Dodrio"
    ]
  },
  {
    "name": "Zen Headbutt",
    "type": "Psychic",
    "waitTime": 5,
    "power": 370,
    "description": "The user focuses its willpower to its head, then smashes it into enemies directly in front of itself, dealing damage to enemies hit by it.",
    "stones": [
      "Broadburst Stone",
      "Wait Less Stone",
      "Whack-Whack Stone"
    ],
    "pokemon": [
      "Raticate",
      "Slowpoke",
      "Slowbro",
      "Tauros"
    ]
  }
] as const;
