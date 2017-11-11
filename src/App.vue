<template>
  <div id="app">
    <div id="workbench">
       <item 
        v-for="i in workbenchItems" 
        v-bind:name="i.name" 
        v-bind:key="i.id"
        v-bind:item="i"
        v-on:onClick="onWorkbenchItemClicked"
        >
        </item>
    </div>
    <ul id="inventory">
        <item 
        v-for="i in inventoryItems" 
        v-bind:name="i.name" 
        v-bind:key="i.id"
        v-bind:item="i"
        v-on:onClick="onInventoryItemClicked"
        >
        </item>
    </ul>
    <div id="actions">
      <button v-on:click="shuffle">Shuffle!</button>
      <button v-on:click="craft">Craft!</button>
    </div>
  </div>
</template>

<script>
import Item from "./components/Item";
import * as _ from "lodash";

let itemId = 0;
class item {
  level = 1;
  name = "unnamed";
  type = "craft";
  elements = [];
  specials = [];

  constructor(name) {
    this.name = name;
    this.id = ++itemId;
  }

  toString() {
    return `${this.name}:${this.id}`;
  }
}

let inventory = [
  new item("glue"),
  new item("stone"),
  new item("rock"),
  new item("stick"),
  new item("glue"),
  new item("bucket"),
  new item("nail"),
  new item("stick")
];

let workbench = [];

function removeFirst(array, item) {
  let i = array.indexOf(item);
  if (i < 0) return false;
  array.splice(i, 1);
  return true;
}

export default {
  name: "app",
  components: {
    Item
  },
  data: () => {
    return {
      inventoryItems: inventory,
      workbenchItems: workbench
    };
  },
  methods: {
    onWorkbenchItemClicked(clicked) {
      let result = removeFirst(this.workbenchItems, clicked.item);
      if (result) {
        this.inventoryItems.push(clicked.item);
      }
    },

    onInventoryItemClicked(clicked) {
      let result = removeFirst(this.inventoryItems, clicked.item);
      if (result) {
        this.workbenchItems.push(clicked.item);
      }
    },

    craft() {
      if (this.workbenchItems.length !== 3) {
        return console.error("wrong noumber of items");
      }
      let a = this.workbenchItems.shift();
      let b = this.workbenchItems.shift();
      let c = this.workbenchItems.shift();

      this.inventoryItems.push(new item("crafted"));

      console.log(`craft ${a} + ${b} + ${c}`);
    },

    shuffle() {
      console.log("shuffle");
      this.inventoryItems = _.shuffle(this.inventoryItems);
    }
  }
};
</script>

<style>
#workbench {
  height: 320px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

#inventory {
  background: #eee;
  margin: 0;
  padding: 0;
  height: 160px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

#actions {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  width: 320px;
  height: 640px;
  border: 1px solid black;
  background: white;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.25);
}
</style>
