<template>
  <div id="app">
    <div class="screen">
      <character-status
        v-bind="character1"
      />
      <battle-bench 
        :workbenchItems="character1.workbench"
        :inventoryItems="character1.inventory"
      >
      </battle-bench>
      <button class="craft" v-on:click="craft(character1)">Craft!</button>
       <br/>
      <button class="craft" v-on:click="reup(character1)">reup!</button>
    </div>
    <div class="screen">
      <character-status
        v-bind="character2"
      />
      <battle-bench
        :workbenchItems="character2.workbench"
        :inventoryItems="character2.inventory"
      >
      </battle-bench>
      <button class="craft" v-on:click="craft(character2)">Craft!</button>
      <br/>
      <button class="craft" v-on:click="reup(character2)">reup!</button>
      

    </div>

  </div>
</template>

<script>

import { wait } from "./util.js";
import { data } from "./battle-craft.js";
import BattleBench from "./components/BattleBench";
import CharacterStatus from "./components/CharacterStatus";

export default {
  name: "app",
  components: {
    BattleBench,
    CharacterStatus
  },
  data: () => {
    return {
      character1: data.character1,
      character2: data.character2
    };
  },
  methods: {
    async reup (crafter) {
      await crafter.onReup();
    },

    async craft (crafter) {
      if (crafter.workbench.length !== 3) {
        return console.error("wrong number of items");
      }

      await crafter.onCraft();

      // await wait(500);
      // await crafter.target.ai();
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Slabo+27px');



html,
body {
  height: 100%;
  font-family: 'Slabo 27px', serif;
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
button.craft {
  width: 300px;
  height: 64px;
  margin: 10px;
  border-radius: 5px;
  background: white;
  border: 1px solid gray;
}
</style>
