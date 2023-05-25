<template>
  <div class="cards">
    <div class="row d-flex">
      <GameCard
        v-for="(card, index) in cards"
        :key="card"
        :card="card"
        :is-current="index === 0"
        @cardAccepted="$emit('cardAccepted');"
        @cardRejected="$emit('cardRejected');"
        @cardSkipped="$emit('cardSkipped');"
        @hideCard="$emit('hideCard');"
      />
    </div>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard";

export default {
  components: {
    GameCard
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },

};
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
  margin: 50px;
  width: 400px;
  // height: 300px;
  
}
</style>
