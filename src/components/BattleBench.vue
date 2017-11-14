<template>
  <div class="battle-bench">
    <div class="workbench">
        <transition-group name="list" tag="div">
            <item
            class = "list-item"
            v-for="i in workbenchItems" 
            v-bind:name="i.name" 
            v-bind:key="i.id"
            v-bind:item="i"
            v-on:onClick="onWorkbenchItemClicked"
            >
            </item>
        </transition-group>
    </div>
    <div class="inventory">
        <transition-group name="list" tag="div">
            <item 
            class = "list-item"
            v-for="i in inventoryItems" 
            v-bind:name="i.name" 
            v-bind:key="i.id"
            v-bind:item="i"
            v-on:onClick="onInventoryItemClicked"
            >
            </item>
        </transition-group>
    </div>
    <div class="actions">
      <button v-on:click="shuffle">Shuffle!</button>
    </div>
  </div>
</template>

<script>

import Item from "./Item";
import * as _ from "lodash";

function removeFirst (array, item) {
  let i = array.indexOf(item);
  if (i < 0) return false;
  array.splice(i, 1);
  return true;
}

export default {
  name: "battle-bench",
  props: ["inventoryItems", "workbenchItems"],
  components: {
    Item
  },
  data: () => {
    return {};
  },
  methods: {
    onWorkbenchItemClicked (clicked) {
      let result = removeFirst(this.workbenchItems, clicked.item);
      if (result) {
        this.inventoryItems.push(clicked.item);
      }
    },

    onInventoryItemClicked (clicked) {
      let result = removeFirst(this.inventoryItems, clicked.item);
      if (result) {
        this.workbenchItems.push(clicked.item);
      }
    },

    shuffle () {
      console.log("shuffle");
      this.inventoryItems = _.shuffle(this.inventoryItems);
    }
  }
};
</script>

<style lang="scss">

@import "../settings.scss";

.battle-bench {
  width: 320px;
  background: white;

}

.workbench {
  height: 64px;
  background-color: #ccc;
}
.workbench > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.inventory > div {
  background: #eee;
  margin: 0;
  padding: 0;
  height: 256px;
}

.actions {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
}

.list-item {
  transition: all 0.2s;
  display: inline-block;
  margin-right: 10px;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(0px) scale(0.5);
}
.list-leave-active {
  position: absolute !important;
}
</style>
