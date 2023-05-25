<template>
  <div>
    <h1 v-if="movie[0].title">{{movie[0].title}}</h1>
    <span>장르: </span><span v-for="(genre, index) in movie[0].genre_ids" :key="`genre-${index}`">{{genre}}, </span> |
    <span>평점: {{movie[0].vote_average}}</span>
    <hr style="opacity: 1;">
  <div class="d-flex">
  <div class="contents">
    <p>줄거리: {{movie[0].overview}}</p>
    <hr>
    <ReviewListItem 
      v-for="review in reviews" :key="review.id" 
        :review="review"/>
    <h5 class="mb-3 fw-bold">리뷰 작성</h5>
    <form @submit.prevent="createReview" @keyup.enter="createReview">
      <label class="mb-2" for="stars">별점</label>
      <select v-model.trim="stars" class="form-select bg-dark text-light mb-2" aria-label="Default select example">
        <option class="text-light" selected>선택해주세요.</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <!-- <label for="stars">별점 : </label>
      <input type="text" id="stars" .trim="stars"><br> -->
      <label class="mb-2" for="content">내용</label>
      <textarea class="form-control bg-dark text-light mb-2" v-model.trim="content" placeholder="리뷰를 작성해주세요." id="content"></textarea>
      <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-outline-light" value="Update">작성</button>
      </div>
      <!-- <input type="submit" id="submit"> -->
    </form>
  </div>
  <img :src="`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie[0].poster_path}`" style="width: 500px;" alt="">
  <form v-if="isFormSelected" @submit.prevent="createReview">
    <label for="stars">별점 : </label>
    <input type="text" id="stars" v-model.trim="stars"><br>
    <label for="content">내용 : </label>
    <textarea id="content" cols="30" rows="10" v-model.trim="content"></textarea><br>
    <input type="submit" id="submit">
  </form>

  <hr>
  </div>
  <h5 @click="goToContents">[뒤로가기]</h5>
  </div>
</template>

<script>
// import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'
// import router from '../router'
import ReviewListItem from '@/components/ReviewListItem'
export default {
  name: 'MovieDetailView',
  components: {
    ReviewListItem
  },
  data() {
    return{
      genreName: null, // 빈 문자열로 초기화
      stars: null,
      content: null,
      isFormSelected: false,
    }
  },
  methods: {
    goToContents(){
      this.$router.push({name: 'MoviesView'})
    },
    createReview() {
      const stars = this.stars;
      const content = this.content;

      if (!stars) {
        alert('별점을 입력해주세요.');
        return;
      } else if (!content) {
        alert('내용을 입력해주세요.');
        return;
      }
      const movieId = this.movie[0].id

      const data = {
        stars: this.stars,
        content: this.content,
        movie_id: movieId,
      };

      this.$store.dispatch('createReviews', data)
      this.stars = null
      this.content = null
  },
  btn_click() {
      this.isFormSelected = !this.isFormSelected
    },
  },
  computed: { 
    genres() {
      return this.$store.state.genre_list
    },
    movie() { // 여기에 무비 디테일 - 하나의 온전한 영화 Object 가져오기
      const selected_movie = this.$store.state.movies.filter(elem => {
        // console.log('here', elem['id'])
        return elem['id'] == this.$route.params.movie_id
      })
      // for (let i=0; i<selected_movie[0].genre_ids.length; i++) {
      //   this.genres.forEach(elem2 => {
      //     if (selected_movie[0].genre_ids[i] == elem2.id) {
      //       selected_movie[0].genre_ids[i] = elem2.name
      //     }
      //   })
      // }
      console.log(selected_movie)
      return selected_movie
    },
    reviews() { // 해당 무비 아이디에서 역참조하고있는 리뷰들 가져오기
      console.log(this.$store.state.reviews)
      let review_list = []
      this.$store.state.reviews.forEach(element => {
        if(element.movie.id == this.movie[0].id) {
          review_list.push(element)
        }
      });
      return review_list
    },
  },

}
</script>


<style scoped>
img {
  height: 80%;
  margin: 10px 0px 0px 30px;
  border-radius: 20px;
}
textarea {
  width: 100%;
}
textarea::placeholder {
  color: rgb(211, 211, 213);
}

</style>