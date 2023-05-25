<template>
  <div id="ReviewListItem">
    <!-- 작성자 이름 누르면 프로필에서 이 사람 상세 프로필 열람 -->
    <div>

        <div class="mb-2">
          <span class="me-2" @click="gotoProfile">작성자: {{ review.username }}</span>
          <span class="me-2">{{ review.stars }}</span>
          <span>{{review.updated_at}}</span>
        </div>

        <!-- 오른쪽 섹션 -->
      <div>
        <p>{{ review.content }}</p>
        
        <div class="d-flex justify-content-end">
          <button v-if="me===review.username" @click="btn_click" type="button" class="btn btn-outline-light">
            수정
          </button>
          <button v-if="me===review.username" @click="deleteReview" type="button" class="btn btn-outline-light">
            삭제
          </button>
          <button @click="review_detail" type="button" class="btn btn-outline-light">
            상세보기
          </button>
        </div>
      </div>
    </div>
    <hr>
    <form v-if="isFormSelected" @submit.prevent="updateReview" @keyup.enter="updateReview">
    <h5 class="mb-3 fw-bold">리뷰 수정</h5>
      <label class="mb-2" for="stars">별점</label><br>
      <select v-model.trim="new_stars" class="form-select bg-dark text-light" aria-label="Default select example">
        <option selected>선택해주세요.</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="3">4</option>
        <option value="3">5</option>
      </select>
      <label class="my-2" for="content">내용</label><br>
      <textarea class="form-control bg-dark text-light" v-model.trim="new_content" id="content"></textarea>
      <br>
      <!-- <button type="button" class="btn btn-secondary">Close</button> -->
      <div class="d-flex justify-content-end">
        <button @click="updateReview" type="submit" class="btn btn-outline-light" value="Update">수정</button>
        <button @click="isFormSelected" type="submit" class="btn btn-outline-light" value="Update">닫기</button>
      </div>
      <hr>
    </form>
  </div>
</template>

<script>
// import router from '../router'
export default {
  name: 'ReviewListItem',
  props: {
      review: Object,
  },
  data() {
  return {
      new_stars: this.review.stars,
      new_content: this.review.content,
      isFormSelected: false,
      star : '⭐',
      me: this.$store.state.me
    }
  },
  methods: {
    updateReview() {
      const stars = this.stars;
      const content = this.content;
      this.isFormSelected = !this.isFormSelected
      if (!stars) {
        alert('별점을 입력해주세요.');
        return;
      } else if (!content) {
        alert('내용을 입력해주세요.');
        return;
      }
      const movieId = this.review.movie.id
      const data = {
        stars: this.new_stars,
        content: this.new_content,
        review_id: this.review.id,
        movie_id: movieId
      };

      this.$store.dispatch('updateReviews', data)
      // router.go()
  },
    btn_click() {
      this.isFormSelected = !this.isFormSelected
    },
    deleteReview() {
      this.$store.dispatch('deleteReview', this.review.id)
    },
    review_detail() {
      this.$router.push({ name: 'ReviewDetailView', params: { review_id: this.review.id, movie_id:this.review.movie.id }})
    },
    gotoProfile() {
      console.log(this.review)
      this.$router.push({name: 'ProfileView', params: {userName: this.review.username}})
    }
  },
  computed: {
    stars() {
      return this.review.stars
    },
    content() {
      return this.review.content
    },
    // total_stars() {
    //   let total = ''
    //   for(let i=0; i<this.review.stars; i++) {
    //     total += this.star
    //   }
    //   return total
    // },
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
}

button {
  margin-right: 10px;
}
</style>