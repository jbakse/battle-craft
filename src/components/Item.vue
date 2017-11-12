<template>
  <div class="item" v-bind:class="item.type" v-on:click="onClick">
    {{name}}
    <div class="level">{{item.level}}</div>
  </div>
</template>

<script>
export default {
  name: "item",
  props: ["name", "item"],
  methods: {
    onClick () {
      this.$emit("onClick", this);
    }
  }
};
</script>


<style scoped>
.item {
  width: 60px;
  height: 60px;

  background: white;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
  margin: 2px;

  box-sizing: border-box;
  border-radius: 8px;
  line-height: 16px;
  font-size: 8px;

  user-select: none;
  cursor: pointer;
  position: relative;
}

.item.attack {
  border: 6px solid red;
}

.item.craft {
  border: 6px solid blue;
}

.item.buff {
  border: 6px solid gray;
}

.level {
  height: 18px;
  width: 18px;
  line-height: 18px;
  position: absolute;
  right: -9px;
  bottom: -9px;
  font-size: 12px;
  background-color: orange;
  border-radius: 9px;
}

</style>
