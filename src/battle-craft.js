import { Item } from './Item';
import { Character } from './Character';

export * from './Character';
export * from './Item';
export * from './Attack';

export let data = {};

let character1 = new Character("eric");
let character2 = new Character("spooky skeleton");
data.character1 = character1;
data.character2 = character2;

character1.target = character2;
character2.target = character1;

// character1.hp = 10;
// character2.hp = 10;

for (let i = 0; i < 10; i++) {
  let r = Math.random();
  if (r < 0.4) {
    giveBoth("pebble");
    // giveBoth("pebble");
  } else if (r < 0.6) {
    // giveBoth("rock");
    giveBoth("rock");
  } else if (r < 0.7) {
    giveBoth("glue");
  } else if (r < 0.75) {
    giveBoth("atk_gem");
  } else if (r < 0.8) {
    giveBoth("def_gem");
  }
}

// giveBoth("pebble");
// giveBoth("pebble");
// giveBoth("pebble");
// giveBoth("pebble");
// giveBoth("pebble");

// giveBoth("rock");
// giveBoth("rock");
// giveBoth("glue");
// giveBoth("rock");
// giveBoth("glue");

// giveBoth("rock");
// giveBoth("rock");
// giveBoth("rock");

// giveBoth("glue");
// giveBoth("glue");

// giveBoth("atk_gem");
// giveBoth("def_gem");

function giveBoth (name) {
  character1.inventory.push(Item.create(name));
  character2.inventory.push(Item.create(name));
}
