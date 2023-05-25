<template>
  <div>
    <h1>ProfileView</h1>
    <hr>
    <div class="row">
      <ProfileDetail class="col-2 text-center"
      :username="username"/> 
      <ProfileDeque class="col-10 "
      :username="username"/> 
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
  }
}
</script>

<style>
</style>