<template>
  <div id="app" class="container">
    <div id="stars-container">
      <BgStarsTwo id="stars"/>
      <!-- <BgStars id="stars"/> -->
    </div>
    
    <!-- <router-link :to="{ name: 'ContentView', params:{userName: me} }">contentView</router-link> | -->
    <router-view/>
    
  </div>
</template>

<script>
// import BgStars from '@/components/BgStars.vue'
import BgStarsTwo from '@/components/BgStarsTwo.vue'

export default {
  name: "App",
  components: {
    // BgStars,
    BgStarsTwo,
  },
  data() {
    return {
    };
  },
  computed: {
    isLogined () {
      return this.$store.getters.isLogin
    },
    me() {
      return this.$store.state.me
    }
  },
  created(){ // OTOmovieList 불러오기 -> 나중에 타이밍 바꾸자
    this.$store.dispatch('getQuestionOTO')
    // this.$store.dispatch('putOTOMovies')
  }
};
</script>

<style>
  @import '@/assets/fonts.css';

  #stars-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }

  #stars {
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
  }
</style>

