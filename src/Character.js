import { Attack } from "./Attack";
import { Item } from "./Item";
import { Buff } from "./Buff";

let characterId = 0;
export class Character {
  id = 0;
  hp = 10;
  armor = 1;
  attack = 0;
  name = "unnamed";
  inventory = [];
  workbench = [];
  buffs = [];
  target = undefined;

  constructor (name) {
    this.name = name;
    this.id = ++characterId;
  }

  toString () {
    return `${this.name}:${this.id}`;
  }

  craft (a, b, c) {
    console.log(`${this.name} crafts ${a} + ${b} + ${c}`);
    let items = [];
    let attacks = [];
    let buffs = [];

    if (a.type === "attack") {
      attacks = attacks.concat(this.craftAttack(a, b, c).attacks);
    }

    if (a.type === "craft") {
      items = items.concat(this.craftItem(a, b, c).items);
    }

    if (a.type === "buff") {
      buffs = items.concat(this.craftBuff(a, b, c).buffs);
    }

    return {
      items,
      attacks,
      buffs
    }
  }

  craftItem (a, b, c) {
    let items = [];

    let newType = b.type;
    let newLevel = b.level + c.level;
    newLevel = Math.min(5, newLevel);

    let matched = Item.match({
      type: newType,
      level: newLevel
    });

    let newName = matched ? matched.name : "crafted";

    for (let i = 0; i < a.level; i++) {
      items.push(new Item(`c:${newName}`, newLevel, newType));
    }

    return { items };
  }

  craftBuff (a, b, c) {
    let buffs = [];
    let buff = new Buff({
      armor: Math.max(b.level, c.level)
    });
    console.log(`${this} crafts a ${buff} buff`);
    buffs.push(buff);
    return { buffs };
  }

  craftAttack (a, b, c) {
    let attacks = [];
    let attack = new Attack(a.level + b.level + c.level);
    console.log(`${this} crafts a ${attack} attack`);
    attacks.push(attack);
    return { attacks };
  }

  applyAttack (attack) {
    let damage = attack.value - this.armor;
    damage = Math.max(0, damage);
    this.hp -= damage;
    console.log(`${this} takes ${damage} damage`);
  }

  applyBuff (buff) {
    console.log(`${this} gets ${buff} buff`);
    this.buffs.push(buff);
  }
}
