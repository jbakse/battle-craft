import { Item } from './Item';
import { Character } from './Character';

export * from './Character';
export * from './Item';
export * from './Attack';

export let data = {};

let character1 = new Character("justin");
let character2 = new Character("greg");
data.character1 = character1;
data.character2 = character2;

character1.target = character2;
character1.inventory.push(Item.create("pebble"));
character1.inventory.push(Item.create("pebble"));
character1.inventory.push(Item.create("pebble"));
character1.inventory.push(Item.create("pebble"));
character1.inventory.push(Item.create("pebble"));
character1.inventory.push(Item.create("pebble"));
character1.inventory.push(Item.create("pebble"));
character1.inventory.push(Item.create("rock"));
character1.inventory.push(Item.create("boulder"));
character1.inventory.push(Item.create("glue"));
character1.inventory.push(Item.create("glue"));
character1.inventory.push(Item.create("superglue"));

character2.target = character1;
character2.inventory.push(Item.create("pebble"));
character2.inventory.push(Item.create("pebble"));
character2.inventory.push(Item.create("pebble"));
character2.inventory.push(Item.create("pebble"));
character2.inventory.push(Item.create("pebble"));
character2.inventory.push(Item.create("pebble"));
character2.inventory.push(Item.create("pebble"));
character2.inventory.push(Item.create("rock"));
character2.inventory.push(Item.create("boulder"));
character2.inventory.push(Item.create("glue"));
character2.inventory.push(Item.create("glue"));
character2.inventory.push(Item.create("superglue"));
