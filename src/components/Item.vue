<template>
  <li v-on:click="onClick">{{name}}</li>
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
li {
  width: 60px;
  height: 60px;

  background: red;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 64px;
  margin: 2px;
}
</style>
