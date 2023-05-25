<template>
  <div>
  <h1>MoviesView</h1>
  <MoviesPopular/>
  <MoviesGenres/>
  </div>
  
</template>

<script>
import MoviesGenres from '@/components/MoviesGenres'
import MoviesPopular from '@/components/MoviesPopular.vue'
export default {
  components: { MoviesPopular, MoviesGenres },
  name: 'MoviesView',
}
</script>

<style>

</style>