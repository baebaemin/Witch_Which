<template>
<div>
  <hr>
  <h1>MoviesGenres</h1>
  <div style="padding:40px;">
    <VueSlickCarousel
            :rows="1"
            :slidesPerRow="1"
            v-bind="settings">
          <GenreListItem v-for="(genre, idx) in genres" :key="idx" :genre="genre" :idx="idx"/>
    </VueSlickCarousel>
  </div>
</div>
</template>

<script>
import GenreListItem from '@/components/GenreListItem'
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
export default {
  name: 'MoviesGenres',
  components: {
    GenreListItem,
    VueSlickCarousel
  },
  computed: {
    genres(){
      console.log(this.$store.state.genre_list)
      return this.$store.state.genre_list
    }
  },
  data() {
    return {
      settings:{
        "dots": true,
        "infinite": true,
        "initialSlide": 0,
        "speed": 500,
        "slidesToShow": 5,
        "slidesToScroll": 1,
        "swipeToSlide": true
      }
    }
  }
}
  
</script>

<style scoped>

</style>