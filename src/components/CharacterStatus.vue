<template>
  <div class="character-status">
    <div class="name">{{name}}</div>
    <div class="armor">Armor: {{armor}}</div>
    <div class="attack">Attack: {{attack}}</div>
    HPs
    <transition-group name="list" tag="div" class="hp" v-bind:class="hpClass">
      <span class="list-item" v-bind:key="n" v-for="n in hp0">{{ n }} </span>
    </transition-group>

    Buffs
    <transition-group name="list" tag="div" class="buffs" v-bind:class="hpClass">
      
      <span
        class = "buff list-item"
        v-for="b in buffs" 
        v-bind:name="b" 
        v-bind:key="b"
        >
        {{b.toString()}}
      </span>


    </transition-group>


  </div>
</template>

<script>
export default {
  name: "characterStatus",
  props: ["name", "hp", "armor", "attack", "buffs"],
  computed: {
    hp0 () {
      return Math.max(0, this.hp);
    },
    hpClass () {
      if (this.hp <= 3) {
        return "danger";
      }
      return false;
    }
  },

  methods: {}
};
</script>

<style scoped>
.character-status {
  color: black;
  background-color: white;
  font-weight: bold;
  padding: 10px;
}


.hp span,
.buff
{
  display: inline-block;
  margin-right: 10px;
  
  width: 16px;
  height: 16px;

  background-color: blue;
  border-radius: 50%;
  
  line-height: 17px;
  
  text-align: center;
  font-size: 10px;
  font-weight: normal;
  color: white;
  
}

.buff
{
  background: gray;
  padding: 0 10px;
  color: white;
  display: inline-block;
  height: 16px;
  border-radius: 8px;
  width: auto;
}

.hp.danger span {
  background-color: red;
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
