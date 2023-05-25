<template>
    <div>
        <h4>ProfileDetail</h4>
        <!-- <img :src="user.imgPath" style="width: 100px;" alt=""> -->
        <h6>{{username}}</h6>
        <hr>
        <!-- <p>reviews: {{user.reviewCounts}}</p> -->
        <p>followers: {{followers_count}}</p>
        <p>followings: {{followings_count}}</p>
        <form v-if="me!==username" @submit.prevent="follow">
            <input v-if="isfollowed" type="submit" value="언팔로우">
            <input v-if="!isfollowed" type="submit" value="팔로우">
        </form>
    </div>
</template>

<script>
export default {
    name: 'ProfileDetail',
    props: {
        username: String,
    },
    data() {
        return{ 
            isfollowed : false
        }
    },
    computed: {
        me() { // 로그인한 유저
            return this.$store.state.me
        },
        follow_data() {
            let user = Object
            for (let i=0; i<this.$store.state.follow.length; i++) {
                if (this.$store.state.follow[i].username === this.username) {
                    console.log(this.$store.state.follow[i])
                    user = this.$store.state.follow[i]
                }
            }
            console.log()
            console.log(user)
            return user
        },
        followers_count() {
            console.log(this.follow_data.followers_count)
            return this.follow_data.followers_count
        },
        followings_count() {
            return this.follow_data.followings_count
        }
    },
    methods: {
        follow() {
            this.isfollowed = !this.isfollowed
            this.$store.dispatch('follow', this.username)
        }
        
    }
}
</script>

<style>

</style>