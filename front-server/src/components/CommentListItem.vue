<template>
  <div>
    <div class="comment-box">
    <div class="fs-5">
      <span class="me-3" @click="goToProfile">댓글 작성자: {{comment.username}}</span>
      <span>{{comment.updated_at}}</span><br>
      <p class="mt-2">{{comment.content}}</p>
    </div>
    <div class="d-flex justify-content-end">
      <button v-if="me===comment.username" @click="btn_click" type="button" class="btn btn-outline-light me-2">
        수정
      </button>
      <button v-if="me===comment.username" @click="deleteComments" type="button" class="btn btn-outline-light">
        삭제
      </button>
    </div>
    </div>
    <form v-if="isFormSelected" @submit.prevent="updateComments">
      <label class="my-3" for="content">댓글 수정</label><br>
      <textarea class="form-control bg-dark text-light" id="content" v-model.trim="new_content" placeholder="Leave a comment here"></textarea>
      <div class="d-flex justify-content-end mt-3">
        <button @click="updateComments" type="submit" class="btn btn-outline-light me-2" value="Update">수정</button>
        <button @click="isFormSelected" type="submit" class="btn btn-outline-light" value="Update">닫기</button>
      </div>
    </form>
    <hr>
  </div>
</template>

<script>
// import router from '../router'
export default {
  name: 'CommentListItem',
  props: {
      comment: Object,
  },
  data() {
    return {
      new_content: this.comment.content,
      isFormSelected: false,
      me: this.$store.state.me
    }
  },
  methods: {
    updateComments() {
      const content = this.content;
      this.isFormSelected = !this.isFormSelected
      if (!content) {
        alert('내용을 입력해주세요.');
        return;
      }
      const data = {
        content: this.new_content,
        comment_id: this.comment.id
      };
      console.log(data)
      this.$store.dispatch('updateComments', data)
      // router.go()
    },
    btn_click() {
      this.isFormSelected = !this.isFormSelected
    },
    deleteComments() {
      this.$store.dispatch('deleteComment', this.comment.id)
    },
    goToProfile(){
      this.$router.push({name: 'ProfileView', params: {userName: this.comment.username}})
    }
  },
  computed: {
    content() {
      return this.comment.content
    }
  }
}
</script>

<style>

</style>