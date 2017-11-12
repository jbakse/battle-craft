<template>
  <div id="app">
    <div class="screen">
      <character-status
      v-bind="character1"
      />
      
      <battle-bench 
      v-on:attacksCrafted="onAttacksCrafted"
      :workbenchItems="character1.workbench"
      :inventoryItems="character1.inventory"
      :owner="character1"
      >
      </battle-bench>
    </div>
    <div class="screen">
      <character-status
      v-bind="character2"
      />
       
      <battle-bench
      v-on:attacksCrafted="onAttacksCrafted"
      :workbenchItems="character2.workbench"
      :inventoryItems="character2.inventory"
      :owner="character2"
      >
      </battle-bench>
    </div>

  </div>
</template>

<script>
import { Character, Item, createLibraryItem } from "./battle-craft.js";
import BattleBench from "./components/BattleBench";
import CharacterStatus from "./components/CharacterStatus";
import * as _ from "lodash";

export default {
  name: "app",
  components: {
    BattleBench,
    CharacterStatus
  },
  data: () => {
    let character1 = new Character("justin");
    character1.inventory.push(createLibraryItem("pebble"));
    character1.inventory.push(createLibraryItem("pebble"));
    character1.inventory.push(createLibraryItem("pebble"));
    character1.inventory.push(createLibraryItem("pebble"));
    character1.inventory.push(createLibraryItem("pebble"));
    character1.inventory.push(createLibraryItem("pebble"));
    character1.inventory.push(createLibraryItem("pebble"));
    character1.inventory.push(createLibraryItem("rock"));
    character1.inventory.push(createLibraryItem("boulder"));
    character1.inventory.push(createLibraryItem("glue"));
    character1.inventory.push(createLibraryItem("glue"));
    character1.inventory.push(createLibraryItem("superglue"));

    let character2 = new Character("greg");
    character2.inventory.push(createLibraryItem("pebble"));
    character2.inventory.push(createLibraryItem("pebble"));
    character2.inventory.push(createLibraryItem("pebble"));
    character2.inventory.push(createLibraryItem("pebble"));
    character2.inventory.push(createLibraryItem("pebble"));
    character2.inventory.push(createLibraryItem("pebble"));
    character2.inventory.push(createLibraryItem("pebble"));
    character2.inventory.push(createLibraryItem("rock"));
    character2.inventory.push(createLibraryItem("boulder"));
    character2.inventory.push(createLibraryItem("glue"));
    character2.inventory.push(createLibraryItem("glue"));
    character2.inventory.push(createLibraryItem("superglue"));

    character1.target = character2;
    character2.target = character1;
    return {
      character1,
      character2
    };
  },
  methods: {
    onAttacksCrafted(crafter, attacks) {
      console.log(`${crafter} attacks ${crafter.target}`);
      // attacks.forEach(attack => {
      //   crafter.target.applyAttack(attack);
      // });
      attacks.forEach(attack => {
        crafter.target.applyAttack(attack);
      });
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  margin: 0;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  width: 700px;
  /* border: 1px solid green; */
  display: flex;
  justify-content: space-between;
}

.screen {
  height: 640px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.25);
  /* border: 1px solid blue; */
}
</style>
