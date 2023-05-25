<template>
    <div id="HomeView">
    <!-- 회원가입 -->

    <!-- welcome text :: margin-top이 아니라 가운데 정렬으로 style="margin-top: 300px" --> 
    <div v-if="sectionOne" @click="showOffCanvas">
      <div class="textContainer ex" id="sectOne">
        <span>W</span><span>i</span><span>t</span><span>c</span><span>h</span> <span>W</span> <span>h</span><span>i</span><span>c</span><span>h</span><span>M</span><span>o</span> <span>s</span><span>t</span><span>u</span><span>d</span><span>i</span><span>o</span> <span>f</span><span>r</span><span>o</span><span>m</span> <span>C</span><span>o</span><span>l</span><span>u</span><span>m</span><span>b</span><span>u</span><span>s</span><span>,</span> <span>O</span><span>h</span><span>i</span><span>o</span><span>.</span>
        <!-- <img :src="require('@/assets/crystal-ball.png')" style="width: 200px;" alt="" /> -->
      </div>
    </div>

    <!-- 카드 스택들 :: margin-top이 아니라 가운데 정렬으로 -->
    <div v-if="sectionTwo" id="sectTwo" style="margin-top: 100px">
        <GameCardsStack class="mx-auto" 
        :cards="visibleCards" 
        @cardRejected="addMovieToRecommendedList(cardIdx, 'left')" 
        @cardAccepted="addMovieToRecommendedList(cardIdx, 'right')" 
        @cardSkipped="handleCardSkipped" 
        @hideCard="removeCardFromDeck" />
    </div> 

    <!-- 카드 세 장 결과 반환 -->
    <div v-if="!lenOfCards" class="d-flex justify-content-center" @clicked="whenCountUpperAll">
      <SelectedCards 
        @card-clicked="handleCardClicked(cardCount)" 
        v-for="(card, index) in cards"
        :key="index"
        :dataImage="card.dataImage"
        :movieTitle="card.movieTitle"
        :movieContents="card.movieContents"
        :isRevealed="card.isRevealed"
      />
    </div>

    <!-- Modal -->
    <div id="modals" data-bs-theme="dark" >
      <div class="modal fade" id="Signup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">위치위치 회원가입 ✨</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="signUp">
                <label for="username1"> 아이디를 입력하세요 </label>
                <input class="input-group-text mt-2 text-start" type="text" id="username1" v-model.trim="username"><br>

                <label for="password1"> 비밀번호를 입력하세요 </label>
                <input class="input-group-text mt-2 text-start" type="password" id="password1" v-model.trim="password1"><br>

                <label for="password2"> 비밀번호를 한 번 더 입력하세요 </label>
                <input class="input-group-text mt-2 text-start" type="password" id="password2" v-model.trim="password2"> 
                <hr>
                <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-outline-secondary me-2" data-bs-dismiss="modal">닫기</button>
                <button type="submit" class="btn btn-outline-secondary" data-bs-dismiss="modal" value="SignUp">회원가입</button> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="Login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">위치위치 로그인 🎆</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="logIn">
              <label for="username2">아이디를 입력하세요 </label>
              <input class="input-group-text mt-2 text-start" type="text" id="username2" v-model.trim="username"><br>

              <label for="password"> 비밀번호를 입력하세요 </label>
              <input class="input-group-text mt-2 text-start" type="password" id="password" v-model.trim="password"><br>
              <button type="button" class="btn btn-outline-secondary me-2" data-bs-dismiss="modal">닫기</button>
              <!-- data-bs-dismiss="modal"가 있었는데요 없었습니다 -->
              <button type="submit" class="btn btn-outline-secondary" data-bs-dismiss="modal" value="logIn">로그인</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>


    <!-- offCanvas data-bs-backdrop="static"  --> 
    <div class="offcanvas offcanvas-end bg-black with-left-border" :data-bs-backdrop="this.$store.token ? 'static' : 'true'" 
    style="width: 35%;" tabindex="-1" id="myOffcanvas" aria-labelledby="staticBackdropLabel">
      <div class="offcanvas-header">
        <h3 class="offcanvas-title sideBar" id="staticBackdropLabel" style="margin: auto; margin-top: 50px">♣ Witch Which ♠</h3>
        
      </div>
      <div class="offcanvas-body text-center">
        <h5 v-if="isLogin && !cardCount"> 🎇 환영합니다, {{me}}님 🎇</h5><br>
        <h5 v-if="cardCount === 3"> 축하합니다! 영화 카드를 {{cardCount}}장 모았어요 😆</h5><br>
        <p class="mb-0"> 당신만의 특별한 영화 카드를 수집하고,</p>
        <p> 취향에 따라 무비덱(Movie Deque)을 구성하고 전시하세요</p> 
        <div style="margin-top: 50px;">
          <div class="circle" v-if="!isLogin" data-bs-toggle="modal" data-bs-target="#Signup">회원가입</div>
          <div class="circle" v-if="!isLogin" data-bs-toggle="modal" data-bs-target="#Login">로그인</div>
          <div class="circle" v-if="!isLogin" @click="go">처음으로</div>
          <router-link v-if="isLogin" :to="{ name: 'ContentView', params:{userName: me} }"><div class="circle">나의 무비덱</div></router-link>
          <div class="circle" v-if="isLogin" @click="go">카드 수집하러 가기</div>
          <div class="circle" v-if="isLogin" @click="logout">로그아웃</div>
        </div>
        
      </div>
      <p style="font-size: 12px" class="mt-auto text-center">
        <span>만든 이: [TEAM SEOMIN] 김서영, 배민경</span><br/>
        <span>이메일: kyskma@gmail.com, hellobaemin@gmail.com</span><br/>
        <span>Copyright 2023. TEAM SEOMIN. All Rights Reserved.</span><br/>
      </p>
    </div>

</div>
</template>

<script>
import $ from 'jquery'
window.$ = $
window.jQuery = $
import GameCardsStack from "@/components/GameCardsStack.vue";
import SelectedCards from '../components/SelectedCards.vue';
import _ from 'lodash'

// import BgStars from '../components/BgStars.vue';
// import TextScramble from '../components/TextScramble.vue'
import router from '../router'


export default {
  name: "HomeView",
  components: {
    GameCardsStack,
    SelectedCards,
    // BgStars,
    // TextScramble,
  },
  data() {
    return {
      sectionOne: true,
      sectionTwo: false,
      cardIdx: 0,
      username : null,
      password : null,
      password1 : null,
      password2 : null,
      cards: [],
      selectedCardCount: 0,
      cardCount: 0,
      canOpenOffCanvas: false
    }
  },
  methods: {
    addMovieToRecommendedList(cardIdx, side) {
      console.log(cardIdx, side) // 잘 나옴
      // left 선택됐으면 장고의 user DB의 recommended 영화 리스트에 추가해야 함 
      // axios 요청을 통해 moive id 검색으로 반환받은 movie obj를 넣기 - 이곳에서 할까? 
      // 로그인하면 user의 recommendedMovieList도 불러와야 함 - 새 테이블 필요?
      this.$store.dispatch('addMovieToRecommendedList', {cardIdx, side}); // {괄호}로 묶어야 한다 !
      // 그리고 DB에도 계속 추가해주기, 중복이면 pass
      // console.log(cardIdx)
      // this.$store.dispatch('addSelectedMovie', cardIdx)
    },
    handleCardSkipped() { // 나중에 이 기능 활용하거나 삭제하거나 
      console.log("handleCardSkipped");
    },
    removeCardFromDeck() { // 선택 완료될때마다 실행됨
      this.visibleCards.shift();
      this.cardIdx ++
      if (this.visibleCards.length === 0) {
        console.log(this.threeCards, 'hererer')
        this.cards = _.sampleSize(this.threeCards, 3)
      }
      
    },
    signUp(event) {
      event.preventDefault();
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      const payload = {
        username, password1, password2
      }
      this.$store.dispatch("signUp", payload)
      this.username = null,
      this.password1 = null,
      this.password2 = null
    },
    logIn() {
      const username = this.username
      const password = this.password
      const payload = {
        username, password
      }
      this.$store.dispatch('logIn', payload)
      this.username = null,
      this.password = null
      this.changeSectionOne()
    },
    logout() {
      // console.log(window.localStorage.getItem('vuex'))
      router.go()
      this.$store.dispatch('logout')
    },
    changeSectionOne() {
      this.sectionOne = false
      this.sectionTwo = true
    },
    changeSectionTwo() {
      this.sectionTwo = false
    },
    handleCardClicked() { // SelectedCards 컴포넌트로부터 받은 카드 개수를 사용
      this.cardCount ++
      // console.log()
      console.log('heheheh', this.cardCount)
      if (this.cardCount >= 3) {
        $('#myOffcanvas').offcanvas('show');
      }
    },
    go() {
      // router.go()
      this.changeSectionOne()
      this.$store.state.selectedCards = []
    },
    showOffCanvas(){
      $('#myOffcanvas').offcanvas('show');
    },
    whenCountUpperAll(){
      console.log('A')
      if (this.cardCount >= 3) { 
        console.log('B')
        $('#myOffcanvas').offcanvas('show');
      }
    }
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin // 로그인 여부
    },
    lenOfCards() {
      return this.visibleCards.length
    },
    allSelected() {
      return !this.lenOfCards
    },
    visibleCards() { //visibleCards는 리스트여야 한다...
      return this.$store.state.visibleCards
    },
    threeCards() {
      return this.$store.state.selectedCards
    },
    me() {
      return this.$store.state.me
    }
    
    // selectedCardCount() {
    //   return this.selectedCards.length
    // },
  },
  created() {
    // DB에 저장되어있는 questionList 두 곳에서 Lodash로 랜덤 질문 5-10개 가져올 예정 
    // -> 미리 store에서 랜덤으로 만들어줘야 함
    // const questionList = this.$store.state.questionList
    // this.visibleCards = questionList.map((question) => question.question);
  },
  // watch: {
  // threeCards(newLength) {
  //   // if (newLength === 3) {
  //     console.log(newLength, 'here!')
  //     // $('#myOffcanvas').offcanvas('show');
  //   // }
  // },
// },
};
</script>

<style lang="scss">


* {
    color: rgb(211, 211, 213);
  }

body {
  background-color: #141414;
}

.fade-in {
  opacity: 0;
  transition: opacity 0.5s;
}

.fade-out {
  opacity: 1;
  transition: opacity 0.5s;
  pointer-events: none;
}

.game-cards-stack-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

#sectOne span {
  color: rgba(255, 255, 255, 0);
  -webkit-text-stroke: 0.45px #eaff74;
}

.offcanvas-end.with-left-border {
  border-left: 0.25px solid white;
  padding: 0px;
}

.textContainer  {
  font-family: 'Pretendard-Regular', sans-serif;
  // position: fixed;
  // top: 30%;
  // left: 50%;
  margin: 0 auto;
  // width: 400px;
  font-size: 130px;
  // font-family: arial;
  line-height: 116px;
  text-align: center;
  letter-spacing: -2px;
  transition: 0.5s;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.sideBar {
  // font-family: 'DRUZHOK', sans-serif;
  font-weight: bold;
  font-size: 50px;
  color: black;
  letter-spacing: 1px;
  text-shadow: -0.5px 0 white, 0 1px white, 1px 0 white, 0 -1px white
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 120px;
  border: 1px solid white;
  border-radius: 50%;
  background-color: (white, 0);
  font-size: 19px;
  font-weight: thin;
  margin: auto;
  margin-top: -15px;
}
.ex span {
  opacity: 0;
  transition: opacity 1300ms;
}

.ex span:nth-child(1) {
  transition-delay: 200ms;
}

.ex span:nth-child(2) {
  transition-delay: 1200ms;
}

.ex span:nth-child(3) {
  transition-delay: 800ms;
}

.ex span:nth-child(4) {
  transition-delay: 300ms;
}

.ex span:nth-child(5) {
  transition-delay: 700ms;
}

.ex span:nth-child(6) {
  transition-delay: 600ms;
}

.ex span:nth-child(7) {
  transition-delay: 400ms;
}

.ex span:nth-child(8) {
  transition-delay: 900ms;
}

.ex span:nth-child(9) {
  transition-delay: 700ms;
}

.ex span:nth-child(10) {
  transition-delay: 650ms;
}

.ex span:nth-child(11) {
  transition-delay: 550ms;
}

.ex span:nth-child(12) {
  transition-delay: 950ms;
}

.ex span:nth-child(13) {
  transition-delay: 150ms;
}

.ex span:nth-child(14) {
  transition-delay: 1050ms;
}

.ex span:nth-child(15) {
  transition-delay: 250ms;
}

.ex span:nth-child(16) {
  transition-delay: 120ms;
}

.ex span:nth-child(20) {
  transition-delay: 500ms;
}

.ex span:nth-child(21) {
  transition-delay: 2000ms;
}

.ex span:nth-child(22) {
  transition-delay: 1950ms;
}

.ex span:nth-child(23) {
  transition-delay: 1650ms;
}

.ex span:nth-child(24) {
  transition-delay: 1750ms;
}

.ex span:nth-child(25) {
  transition-delay: 1650ms;
}

.ex span:nth-child(26) {
  transition-delay: 1750ms;
}

.ex span:nth-child(27) {
  transition-delay: 1350ms;
}

.ex span:nth-child(28) {
  transition-delay: 1650ms;
}

.ex span:nth-child(29) {
  transition-delay: 1300ms;
}

.ex span:nth-child(30) {
  transition-delay: 1650ms;
}

.ex span:nth-child(31) {
  transition-delay: 1450ms;
}

.ex span:nth-child(32) {
  transition-delay: 900ms;
}

.ex span:nth-child(33) {
  transition-delay: 1150ms;
}

.ex span:nth-child(34) {
  transition-delay: 1050ms;
}

.ex span:nth-child(35) {
  transition-delay: 1850ms;
}

.ex span:nth-child(36) {
  transition-delay: 1650ms;
}

.ex:hover span {
  opacity: 1;
}
</style>
