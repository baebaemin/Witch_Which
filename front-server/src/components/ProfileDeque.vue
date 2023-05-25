<template>
  <div>
    <h3>ProfileDeque</h3>
    <hr>
    <div class="row" style="justify-content: center;">
      <p class="favoriteCard">+</p>
      <p class="favoriteCard">+</p>
      <p class="favoriteCard">+</p>
    </div>

    <div class="main row mt-4 ps-3">
      <span
        v-for="(card, index) in user_deque" 
        :key="index"
        class="card mb-3 shining" 
        data-bs-toggle="offcanvas" 
        data-bs-target="#offcanvasRight" 
        aria-controls="offcanvasRight"
        @mouseover="handleCardHover(index)"
        @mouseleave="handleCardLeave"
        @click="handleCardClick(index, card)"
        :class="{ 'hover': isCardHovered === index }"
      >
        <div class="card-content">
          <img
            v-if="card && card.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${card.poster_path}`"
            alt="Movie Image"
            class="card-image" style="width: 100%"
          />
          <!-- <div class="card-title">{{ card.title }}</div> -->
        </div>
      </span>
    </div>

    <!-- 사이드바 -->
    <div class="offcanvas offcanvas-end bg-black with-left-border" style="width: 35%;" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-body" style="padding: 0px;">
        <div style="position: fixed; padding: 15px" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
          <i class="fa-solid fa-chevron-left font-size: 100px;"></i>
        </div>
        <img
          :src="`https://image.tmdb.org/t/p/w500${clickedCard.backdrop_path}`"
          style="width: 100%;"
        />
        <div style="padding: 25px; font-weight: 400; margin-bottom: 0px;">
          <div class="d-flex justify-content-between">
            <p style="font-size: 23px;">{{clickedCard.title}}</p>
            <div class="d-flex justify-content-between">
            <i class="fa-solid fa-star" style="color: #feda58; line-height: 1.9;"> </i>
            <p style="line-height: 2.0; margin-left: 7px">{{ voteAverageofCard }}</p> 
            </div>
          </div>
          <p>{{clickedCard.overview}}</p>
        </div>
        <div style="text-align: right; margin-right: 1px"
        @click="goToMovieDetail">
          <span>더 보기 </span>
          <i style="margin-right: 30px;" class="fa-solid fa-chevron-right font-size: 80px;"></i>
        </div>
        <hr>
        <p  style="font-size: 23px; padding: 10px 25px 10px 25px; margin-bottom: 0px;">리뷰</p>
        <div style="padding: 20px 25px 20px 25px; font-weight: 400; margin-bottom: 0px;" v-for="(review, index) in movie_reviews" :key="index">
          <p>작성자: {{review.username}}</p>
          <p>별점: {{review.stars}}</p>
          <p>내용: {{review.content}}</p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';

export default {
  name: 'ProfileDeque',
  data() {
    return {
      isCardHovered: null, // hovered된 카드의 인덱스 부분 추적
      isSidebarOpen: false,
      clickedCard: Object,
      star: '⭐'
    }
  },
  props: {
    username: String,
  },
  computed: {
    amountsOfCards() {
      console.log(this.user.recommendedMovieList.length)
      return this.user.recommendedMovieList.length
    },
    voteAverageofCard(){
      const voteAverage = this.clickedCard.vote_average
      return Number.parseFloat(voteAverage).toFixed(2);
    },
    // recommend() {
    //   return this.$store.state.genre_recommend_list
    // },
    reviews() {
      return this.$store.state.reviews
    },
    movie_reviews() {
      let review_list = []
      for(let i=0; i<this.reviews.length; i++) {
        if (this.reviews[i].movie.id === this.clickedCard.id) {
          review_list.push(this.reviews[i])
        }
      }
      return review_list
    },
    movies() {
      return this.$store.state.movies
    },
    user_deque() {
      let user_movies = []
      for (let j=0; j<this.$store.state.user_deque_movies.length; j++) {
        for (let i=0; i<this.movies.length; i++) {
          if (this.movies[i].id == this.$store.state.user_deque_movies[j]) {
            user_movies.push(this.movies[i])
            break
          }
        }
      }
      console.log(user_movies)
      return user_movies
    }
  },
  // mounted() {
  //   const colors = ["#ffd0d2", "#fffdd0", "#d0fffd", "#d0d2ff"];
  //   this.$nextTick(() => {
  //     $(".main").children('.card').each((index, element) => {
  //       const firstGradient = this.randomNumber(10, 40);
  //       $(element).css(
  //         "background", "linear-gradient(141deg, " + colors[this.randomNumber(0, 4)] + " " + firstGradient + "%, " + colors[this.randomNumber(0, 4)] + ")"
  //       );
  //     });
  //   });
  // },
  methods: {
    randomNumber(min, max) { // gradient 때문에 생성
      return Math.floor((Math.random() * max) + min);
    },
    handleCardHover(index) {
      this.isCardHovered = index;
    },
    handleCardLeave() {
      this.isCardHovered = null;
    },
    handleCardClick(index, card) {
      console.log('clicked')
      if (this.isSidebarOpen && this.isCardHovered === index) {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.clickedCard = card
    },
    handleSidebarOpen() {
      this.isSidebarOpen = true;
    },
    handleSidebarClose() {
      this.isSidebarOpen = false;
    },
    goToMovieDetail() {
      // 디테일 페이지를 못 불러오는데 ? 
      console.log(this.clickedCard.id)
      const movieId = this.clickedCard.id;
      this.$router.push({ name: 'MovieDetailView', params: { movie_id: movieId } });
    },
    // get_user_deque() {
    //   this.$store.dispatch('get_user_deque')
    // }
  }
};
</script>

<style scoped>  

hr {
  opacity: 1;
}

.favoriteCard {
  width: 140px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
}

.card {
  width: 120px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 15px;
  border: none;
}

.card-content {
  position: relative;
  width: 120px;
  height: 180px;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.card-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
  text-align: center;
}

.offcanvas-end.with-left-border {
  border-left: 0.25px solid white;
  padding: 0px;
}

/* card hover 애니메이션 */
.card {
  position: relative;
  transition: transform 0.2s ease-in-out;
}

.card.hover {
  transform: scale(1.15);
  z-index: 1;
  /* border: 0.5px solid white; */
}

.card.hover + .card {
  position: relative;
  left: 0;
}

.card.hover ~ .card {
  position: relative;
  transition: left 2.5s ease-in-out;
}

.card.minimize {
  transform: scale(1);
}

  .shining:hover {
    background: transparent;
    box-shadow: 0 0 10px 5px  rgba(255, 255, 255, 0.2) ;
  }
  .shining:hover::before {
    transform: translateX(100%);
  }
</style>