<template>
  <div>
    ContentView's nav:: 
    <router-link :to="{ name: 'HomeView'}"> 카드 수집하러 가기 </router-link> | 
    <router-link :to="{ name: 'ProfileView', params: {userName:me} }"> 나의 무비덱 </router-link> | 
    <router-link :to="{ name: 'MoviesView' }"> 실시간 인기 영화 순위 </router-link>
    <hr style="opacity: 1;">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'ContentView',
  computed:{
    me() {
      return this.$store.state.me
    }
  }
}
</script>

<style>

</style>