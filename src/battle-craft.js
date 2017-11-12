import * as _ from "lodash";


let characterId = 0;
export class Character {
  id = 0;
  hp = 10;
  armor = 1;
  name = "unnamed";
  inventory = [];
  workbench = [];
  target = undefined;

  constructor(name) {
    this.name = name;
    this.id = ++characterId;
  }

  toString() {
    return `${this.name}:${this.id}`;
  }


  craft(a, b, c) {

    console.log(`${this.name} crafts ${a} + ${b} + ${c}`);
    let items = [];
    let attacks = [];

    if (a.type == "attack") {
      attacks.push(new Attack(a.level + b.level + c.level));
    }

    if (a.type == "craft") {
      let level = b.level + c.level;
      level = Math.min(5, level);
      let type = b.type;

      let name = "crafted";
      let matches = _.filter(itemLibrary, (item) => {
        return item.level <= level && item.type === type;
      });
      _.sortBy(matches, ['level']);

      if (matches.length > 0) {
        let match = matches.pop();
        name = match.name;
        if (match.level < level) {
          name += "+";
        }
      }

      for (let i = 0; i < a.level; i++) {

        items.push(new Item(`c:${name}`, level, type));

      }


    }

    return {
      items,
      attacks
    }
  }

  applyAttack(attack) {
    let damage = attack.value - this.armor;
    damage = Math.max(0, damage);
    this.hp -= damage;
    console.log(`${this} takes ${damage} damage`);
  }
}

let itemId = 0;
export class Item {
  id = 0;
  name = "unnamed";
  level = 0;
  type = "craft";
  elements = [];
  specials = [];

  constructor(name, level = 0, type = "craft") {
    this.name = name;
    this.level = level;
    this.type = type;
    this.id = ++itemId;
  }

  toString() {
    return `${this.name}:${this.id}`;
  }
}

export function createLibraryItem(name) {
  let item;
  if (itemLibrary[name]) {
    item = _.cloneDeep(itemLibrary[name]);
  } else {
    item = _.cloneDeep(itemLibrary.dust);
  }
  item.id = ++itemId;
  return item;
}

let itemLibrary = {
  dust: new Item("dust", 0, "attack"),
  pebble: new Item("pebble", 1, "attack"),
  rock: new Item("rock", 2, "attack"),
  boulder: new Item("boulder", 4, "attack"),
  glue: new Item("glue", 1, "craft"),
  superglue: new Item("superglue", 2, "craft")

}

export class Attack {
  value = 1;
  constructor(value = 1) {
    this.value = value;
  }
}

