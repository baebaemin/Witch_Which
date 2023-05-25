<template>
  <div>
    <div class="pd16">
      <div @click="goToMoviesGenres" :style="cardStyle" class="card">
        <h2 style="opacity: 1;">{{genre.name}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenreListItem',
  data() {
    return {
      // 이미지 리스트
      image_list:[
        require('../assets/card_action.jpg'),
        require('../assets/card_adventure.jpg'),
        require('../assets/card_animation.jpg'),
        require('../assets/card_comedy.jpg'),
        require('../assets/card_crime.jpg'),
        require('../assets/card_documentary.jpg'),
        require('../assets/card_drama.jpg'),
        require('../assets/card_family.jpg'),
        require('../assets/card_fantasy.jpg'),
        require('../assets/card_history.jpg'),
        require('../assets/card_horror.jpg'),
        require('../assets/card_music.jpg'),
        require('../assets/card_mystery.jpg'),
        require('../assets/card_romance.jpg'),
        require('../assets/card_SF.jpg'),
        require('../assets/card_TV.jpg'),
        require('../assets/card_thriller.jpg'),
        require('../assets/card_war.jpg'),
        require('../assets/card_western.jpg')
    ]
    }
  },
  props: {
    genre: Object,
    idx: Number
  },
  computed: {
    cardStyle() {
      return {
        backgroundImage: `url(${this.getImageUrl()})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      };
    }
  },
  methods: {
    // 이미지 경로 가져오기
    getImageUrl() {
      return this.image_list[this.idx];
    },
    // 장르를 클릭했을 때 이동
    goToMoviesGenres() {
      this.$router.push({name: 'MoviesGenreView', params: {genreName: this.genre.name}});
    }
  }
}
</script>

<style scoped>
.pd16 {
  padding: 16px;
}

.card {
  position: relative;
  height: 150px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  background-color: transparent;
}

.card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); /* 배경색 및 투명도 설정 */
  z-index: 1;
}

h2 {
  position: relative;
  line-height: 150px;
  z-index: 2;
}
</style>