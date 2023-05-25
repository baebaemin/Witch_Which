<template>
  <div>
    <h1>{{movie.title}}</h1>
    <div class="mt-5 mb-2 fs-4">
      <span class="me-2">리뷰 작성자: {{ review.username }}</span> 
      <span class="me-2">{{ review.stars }}</span>
      <span>{{ review.updated_at }}</span>
    </div>
    <p class="fs-4">{{ review.content }}</p>
    <hr style="opacity:1">
    <CommentListItem v-for="comment in comments" :key="comment.id" 
      :comment="comment"/>
    <form @submit.prevent="createComment" @keyup.enter="createComment">
      <label class="mb-2" for="content">댓글 작성</label>
      <textarea class="form-control bg-dark text-light" id="content" v-model.trim="content" placeholder="댓글을 작성해주세요."></textarea>
      <div class="d-flex justify-content-end mt-2">
        <button type="submit" class="btn btn-outline-light">작성</button>
      </div>
    </form>
    <h5 @click="goToMovieDetail">[뒤로가기]</h5>
  </div>
</template>

<script>
import CommentListItem from '../components/CommentListItem.vue'
export default {
  name: 'ReviewDetailView',
  data() {
    return {
      content: null,
      star: '⭐'
    }
  },
  components:{
    CommentListItem
  },
  methods:{
    createComment() {
      const content = this.content;
      if (!content) {
        alert('내용을 입력해주세요.');
        return;
      }

      const data = {
        content: this.content,
        review_id: this.reviewId,
      }
      this.$store.dispatch('createComments', data)
      this.content = null
    },
    goToMovieDetail(){
      this.$router.push({name: 'MovieDetailView', params: {movie_id:this.movieId}})
    },
  },
  computed: {
    movieId() {
      return this.$route.params.movie_id
    },
    reviewId() {
      return this.$route.params.review_id
    },
    movies() {
      return this.$store.state.movies
    },
    reviews() {
      return this.$store.state.reviews
    },
    movie() {
      let selected_movie = Object
      for (let i=0; i<this.movies.length; i++) {
        if(this.movies[i].id == this.movieId) {
          selected_movie = this.movies[i]
          break
        }
      }
      return selected_movie
    },
    review() {
      let selected_review = Object
      for (let i=0; i<this.reviews.length; i++) {
        if(this.reviews[i].id == this.reviewId) {
          selected_review = this.reviews[i]
          break
        }
      }
      console.log(selected_review)
      return selected_review
    },
    comments() {
      let comment_list = []
      this.$store.state.comments.forEach(element => {
        if(element.review.id == this.reviewId) {
          console.log(element)
          comment_list.push(element)
        }
      });
      return comment_list
    },
    // total_stars() {
    //   let total = ''
    //   for (let i=0; i<this.review.stars; i++) {
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
  textarea::placeholder {
  color: rgb(211, 211, 213);
}
  /* form {
    width: 100%;
    
  } */
</style>