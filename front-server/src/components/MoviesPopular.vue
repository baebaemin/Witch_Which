<template>
<div>
  <hr>
  <h1 style="text-align:center;">인기 영화 차트</h1>
  <div class="d-flex flex-wrap justify-content-between">
    <div v-for="(top20, index) in top20_movies" :key="index" @click="goToMovieDetail(index)">
      <div class="card mx-4 mb-3" >
        <img :src="`https://image.tmdb.org/t/p/w500${top20.poster_path}`" class="card-image" alt="...">
        <!-- <div style="border-top: 1px solid white" class="card-body bg-dark text-light text-center">
          <h5 class="card-title">{{top20.title}}</h5>
        </div> -->
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-end">
    <h2 @click="goToMoviesPopular">[인기 영화 더 보기]</h2>
  </div>
</div>
</template>

<script>
export default {
  name: 'MoviesPopular',
  methods: {
    goToMoviesPopular(){
      this.$router.push({name: 'MoviesPopularView'})
    },

    goToMovieDetail(index) {
      // 
      console.log(index)
      console.log(this.top20_movies[index].id)
      this.$router.push({name: 'MovieDetailView', params: {movie_id: this.top20_movies[index].id}})
    }
    
  },
  computed:{
    movies(){
      return this.$store.state.movies
    },
    top20_movies() {
      let top20 = []
      for (let i=0; i<17; i++) {
        if (this.movies[i].title === '막내 처제') {
          continue
        } else{
          top20.push(this.movies[i])
        }
      }
      return top20
    }
  }
}
</script>

<style scoped>
.card {
  width: 7rem;
}
</style>