<template>
  <div>
    <h1>ProfileView</h1>
    <hr>
    <div class="row">
      <ProfileDetail class="col-2 text-center"
      :username="username"/> 
      <ProfileDeque class="col-10 "
      :user="user"/> 
    </div>
  </div>
</template>

<script>
import ProfileDetail from '@/components/ProfileDetail'
import ProfileDeque from '@/components/ProfileDeque'
// import _ from 'lodash'

export default {
  name: 'ProfileView',
  components: {
    ProfileDetail, 
    ProfileDeque,
  },
  computed: {
    username(){
      return this.$route.params.userName
    },
    user(){ // 다른유저 볼 수 있는지 테스트 - 지금은 user 랜덤으로
      // const ranNum = _.sample([0, 1, 2])
      return this.$store.state.users[0]
    }
  }
}
</script>

<style>
</style>