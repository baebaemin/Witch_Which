<template>
  <div id="MovieListItem">
    <div class="mb-4" @click="goToMovieDetail">
      <div class="card" style="width: 15rem;">
        <img :src="`https://image.tmdb.org/t/p/w500${movieImage}`" class="card-image" alt="...">
        <div style="border-top: 1px solid white" class="card-body bg-dark text-light text-center">
          <h5 class="card-title">{{movie.title}}</h5>
        </div>
    </div>
    <!-- <div class="card-content">
      <div class="card-title">{{movie.title}}</div>
      <img
        :src="`https://image.tmdb.org/t/p/w500${movieImage}`"
        alt="Movie Image"
        class="card-image" style="width: 100%"
      />
      <div class="card-title">{{ card.title }}</div>
    </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieListItem',
  props: {
    movie: Object,
  },
  methods:{
    goToMovieDetail(){
      this.$router.push({
      name: 'MovieDetailView',
      params: { movie_id: this.movie.id },

    });
    }
  },
  computed: {
    movieImage() {
      return this.movie.poster_path

    }
  }
}
</script>

<style scoped>
.card-body {
  height: 80px;
}
img {
  height: 20rem;
}
</style>