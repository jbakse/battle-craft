import * as _ from "lodash";

import { Attack } from "./Attack";
import { Item } from "./Item";
import { Buff } from "./Buff";
import { wait } from "./util.js";
let characterId = 0;
export class Character {
  id = 0;
  hp = 15;
  defense = 0;
  calcDefense = 0;
  attack = 0;
  calcAttack = 0;
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

  async onReup () {
    if (this.buffs.length) {
      this.buffs.shift();
      this.updateCalcs();
    } else {
      this.hp--;
    }

    await wait(500);
    this.inventory.push(Item.create("pebble"));

    await wait(250);
    this.inventory.push(Item.create("pebble"));

    await wait(250);
    this.inventory.push(Item.create("pebble"));
  }

  async onCraft () {
    console.log('%cStart Turn', 'background: black; color: white;');

    // craft
    let a = this.workbench.shift();
    await wait(100);

    let b = this.workbench.shift();
    await wait(100);

    let c = this.workbench.shift();
    await wait(500);

    let { items, attacks, buffs } = this.craft(a, b, c);
    this.applyCraft({ items, attacks, buffs });
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
    newLevel = Math.min(3, newLevel);
    let newName = b.name;

    for (let i = 0; i < a.level; i++) {
      items.push(new Item(`${newName}`, newLevel, newType));
    }

    return { items };
  }

  craftBuff (a, b, c) {
    let buffs = [];

    let buffType = a.specials[0];
    let options = {};
    options[buffType] = Math.min(b.level, c.level);
    let buff = new Buff(options);

    console.log(`${this} crafts a ${buff} buff`);
    buffs.push(buff);
    return { buffs };
  }

  craftAttack (a, b, c) {
    let attacks = [];
    let level = this.calcAttack + b.level + c.level;
    let attack;

    for (let i = 0; i < a.level; i++) {
      attack = new Attack(level);
      attacks.push(attack);
    }

    console.log(`${this} crafts a ${a.level}x ${level} damage attack`);

    let lowestItem = _.first(_.sortBy([a, b, c], 'level'));
    attack.leftovers.push(lowestItem);

    return { attacks };
  }

  // craftItem (a, b, c) {
  //   let items = [];

  //   let newType = b.type;
  //   let newLevel = b.level + c.level;
  //   newLevel = Math.min(5, newLevel);

  //   let matched = Item.match({
  //     type: newType,
  //     level: newLevel
  //   });

  //   let newName = matched ? matched.name : "crafted";

  //   for (let i = 0; i < a.level; i++) {
  //     items.push(new Item(`c:${newName}`, newLevel, newType));
  //   }

  //   return { items };
  // }

  // craftBuff (a, b, c) {
  //   let buffs = [];
  //   let buff = new Buff({
  //     defense: Math.min(3, Math.max(b.level, c.level))
  //   });
  //   console.log(`${this} crafts a ${buff} buff`);
  //   buffs.push(buff);
  //   return { buffs };
  // }

  // craftAttack (a, b, c) {
  //   let attacks = [];
  //   let attack = new Attack(a.level + b.level + c.level);

  //   let lowestItem = _.first(_.sortBy([a, b, c], 'level'));
  //   attack.leftovers.push(lowestItem);

  //   console.log(`${this} crafts a ${attack} attack`);
  //   attacks.push(attack);
  //   return { attacks };
  // }

  applyCraft ({items = [], attacks = [], buffs = []}) {
    // add items to inventory
    if (items.length > 0) {
      console.log(`${this} crafts`);
      items.forEach(item => {
        this.applyItem(item);
      });
    }

    // dole out damage
    if (attacks.length > 0) {
      console.log(`${this} begins attack`);
      attacks.forEach(attack => {
        this.applyAttack(attack);
      });
    }

    // apply buffs
    if (buffs.length > 0) {
      console.log(`${this} buffs ${this}`);
      buffs.forEach(buff => {
        this.applyBuff(buff);
      });
    }
  }

  applyItem (item) {
    console.log(`${this} crafted a level ${item.level} ${item.name}`);
    this.inventory.unshift(item);
  }

  applyAttack (attack) {
    console.log(`${this} attacks ${this.target} for ${attack.value} damage`);
    this.target.receiveAttack(attack);
  }

  applyBuff (buff) {
    console.log(`${this} gets ${buff} buff`);
    this.buffs.push(buff);
    this.updateCalcs();
  }

  receiveAttack (attack) {
    let damage = attack.value - this.calcDefense;
    damage = Math.max(0, damage);
    console.log(`${this} deflects ${this.calcDefense} and takes ${damage} damage`);
    this.hp -= damage;
    attack.leftovers.forEach(item => {
      console.log(`${this} gets a ${item}`);
      this.inventory.unshift(item);
    });
  }

  updateCalcs () {
    this.calcDefense = this.defense;
    this.calcAttack = this.attack;

    this.buffs.forEach(buff => {
      if (buff.effects.defense) {
        this.calcDefense += buff.effects.defense;
      }
      if (buff.effects.attack) {
        this.calcAttack += buff.effects.attack;
      }
    });
  }

  async ai () {
    console.log('%cAI', 'background: black; color: white;');

    this.workbench.push(this.inventory.shift());

    await wait(500);
    this.workbench.push(this.inventory.shift());

    await wait(500);
    this.workbench.push(this.inventory.shift());

    await wait(500);
    this.onCraft();
  }
}
