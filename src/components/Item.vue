<template>
  <div v-bind:class="'item ' + item.type" v-on:click="onClick">
    {{name}}
    
    <div class="level">{{item.level}}</div>
    
  </div>
</template>

<script>
export default {
  name: "item",
  props: ["name", "item"],
  methods: {
    onClick() {
      this.$emit("onClick", this);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.attack {
  border: 6px solid red;
}
.craft {
  border: 6px solid blue;
}
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

  /* position: relative; */
}

.level {
  /* border: 1px solid orange; */
  height: 18px;
  width: 18px;
  line-height: 18px;
  /* position: absolute; */
  right: -9px;
  bottom: -9px;
  font-size: 12px;
  background-color: orange;
  border-radius: 9px;
}
</style>
