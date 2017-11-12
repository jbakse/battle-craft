<template>
  <div>{{name}}: {{hp}}</div>
</template>

<script>
export default {
  name: "characterStatus",
  props: ["name", "hp"],
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  color: black;
  background-color: white;
  font-weight: bold;
  padding: 10px;
}
</style>
