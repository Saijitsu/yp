class Weapons {
  constructor(name, power, worn) {
    this.name = name;
    this.power = power;
    this.worn = worn; // already equipped
  }

  describe() {
    return this.name + " gives a strength of " + this.power +
      " attack damage to its owner!";
  };
}

// Object Weapon 0
const PEASANT_SWORD = new Weapons("Peasant Sword", 10, true);
// Object Weapon 1
const SWORD_OF_WIND = new Weapons("Sword Of Wind", 11, false);
// Object Weapon 2
const SWORD_OF_FIRE = new Weapons("Sword Of Fire", 13, false);
// Object Weapon 3
const SWORD_OF_THUNDER = new Weapons("Sword Of Thunder", 17, false);
// Object Weapon 4
const MAGIC_WAND = new Weapons("Magic Wand", 19, false);
// Object Weapon 5
const BOW_OF_LIGHT = new Weapons("Bow Of Light", 21, false);
// Object Weapon 6
const IRON_HAMMER = new Weapons("Iron Hammer", 23, false);
// Object Weapon 7
const GORON_S_SWORD = new Weapons("Goron\'s Sword", 25, false);
// Object Weapon 8
const KAKARIKO_BOMB = new Weapons("Kakariko Bomb", 34, false);


// Weapons Array!
const weapons = [PEASANT_SWORD, SWORD_OF_WIND, SWORD_OF_FIRE, SWORD_OF_THUNDER,
  MAGIC_WAND, BOW_OF_LIGHT, IRON_HAMMER, GORON_S_SWORD, KAKARIKO_BOMB
]

// Array of entry in weapons Array (less the first one):
let weaponsEntry = [];
for (let entry = 1; entry < weapons.length; entry++) {
  weaponsEntry.push(entry)
}
