<template>
   <div >
    <div class="d-flex justify-content-between">
    <div></div>
    <div class="mt-4">
      <router-link :to="{ name: 'HomeView'}"> 
        <div class="btn btn-outline-light me-3"> 카드 수집하러 가기 </div> </router-link>
      <router-link :to="{ name: 'ProfileView', params: {userName:me} }"> 
        <div class="btn btn-outline-light me-3"> 나의 무비덱 </div> </router-link>
      <router-link :to="{ name: 'MoviesView' }"> 
        <div class="btn btn-outline-light"> 실시간 인기 영화 순위 </div> </router-link>
      </div>
    </div>
    <hr style="opacity: 1;">
    <router-view/>
    <hr style="opacity: 1;">
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
a {
  text-decoration: none;
  color: white;
}
</style>