<template>
  <div class="mx-3 text-center" @click="fadeInObject">
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :class="shouldFadeIn"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]" 
        :class="fadeIn ? 'fade-in': 'cardBg'" 
        ref="cardBg"></div>
        <div class="card-info" :style="{ opacity: fadeIn ? 1 : 0 }">
          <slot name="header">
            <p class="text-start mx-3" id="header" style="margin-bottom: 0px;">{{movieTitle}}</p>
          </slot>
          <slot name="content">
            <p class="text-start mx-3" style="margin-top: 0px; font-size: 18px;">{{movieContents}}</p>
          </slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

        // .then((res) => { // 온전한 데이터가 들어옴
        //   const movieId = res.data.movie_id
        //   let isSameMovie = null
        //   for (let i=0; i<this.state.movies.length; i++) {
        //     if (this.state.movies[i].id === movieId) {
        //       const movieStored = this.state.All_users[res.data.user_id-1].user_movies
        //         isSameMovie = movieStored.find(movie => {
        //           return movie.type === this.state.movies[i].type
        //         });
        //         console.log(isSameMovie)
              // for (let j=0; j<this.state.All_users[res.data.user_id-1].user_movies.length; j++) {
              //   if (this.state.All_users[res.data.user_id-1].user_movies[j].type === this.state.movies[i].type) {
              //     console.log(this.state.movies[i], "얘는 중복이야")
              //     continue
              //   } else {
              //     console.log(this.state.movies[i], '얘는 처음이야')
              //     this.state.All_users[res.data.user_id-1].user_movies.push(this.state.movies[i])
              //   }
              // }
              // if (this.state.All_users[res.data.user_id-1].user_movies.includes(this.state.movies[i])){
              //   console.log(this.state.movies[i], "얘는 중복이야")

              //   continue
              // } else {
              //     console.log(this.state.movies[i], '얘는 처음이야')
              //     this.state.All_users[res.data.user_id-1].user_movies.push(this.state.movies[i])
              // }



export default {
  name: 'SelectedCards',
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },

  props: {
    dataImage: String,
    movieTitle: String,
    movieContents: String,
  },

  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null,
    fadeIn: false,
    isClicked: false,
  }),

  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`,
        opacity: this.fadeIn ? 0.7 : 0  // fadeIn이 true인 경우에만 opacity를 1로 설정.
      }
    },
    shouldFadeIn() {
      return this.fadeIn ? 'fade-in active' : '';
    },
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    },
    handleMouseEnter() {
    if (this.fadeIn) {
      clearTimeout(this.mouseLeaveDelay);
    }
},
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 250);
    },
    fadeInObject() {
      this.fadeIn = true;
      this.$refs.cardBg.style.opacity = 0.8;
      console.log('clicked', this.movieTitle)
      if (!this.isClicked) {
        this.isClicked = true
        console.log('isClicked', this.isClicked)
        this.$emit('card-clicked', 1);
      } else {
        this.$emit('card-clicked', 1);
      }
      
    },
  }

};
</script>

<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

.fade-in {
  opacity: 0;
  transition: opacity 1s ease-in;
}

.fade-in.active {
  opacity: 1;
}

.cardBg {
  opacity: 0;
}

p {
  line-height: 1.5em;
}

h1+p,
p+p {
  margin-top: 0px;
}

// .container {
//   padding: 40px 80px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
// }

.card-wrap {
  margin: 0px;
  transform: perspective(800px);
  transform-style: preserve-3d;
    display: inline-block;

  cursor: pointer;

  &:hover {
    .card-info {
      transform: translateY(0);
    }
    .card-info p {
      opacity: 1;
    }
    .card-info,
    .card-info p {
      transition: 0.6s $hoverEasing;
    }
    .card-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }
    .card-bg {
      transition: 0.6s $hoverEasing, opacity 5s $hoverEasing;
      opacity: 0.9; //
    }
    .card {
      transition: 0.6s $hoverEasing, box-shadow 2s $hoverEasing;
      box-shadow: rgba(rgb(255, 255, 255), 0.2) 0 0 40px 5px, rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }
  }
}

.card {
  position: relative;
  flex: 0 0 240px;
  width: 340px;
  // height: 330px;
  aspect-ratio: 24/33;
  background-color: rgba(rgb(0, 0, 0), 0);
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(rgb(0, 0, 0), 0.66) 0 0px 0px 0, inset #151515 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.card-bg {
  opacity: 0.0;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 110%;
  height: 110%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 1s $returnEasing, opacity 1s 0.5s $returnEasing;
  pointer-events: none;
}

.card-info {
  padding: 8px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(50%);
  width: 100%;
  transition: 2.5s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    opacity: 0;
    text-shadow: rgba(rgb(8, 8, 8), 0.45) 0 0px 4px;
    transition: 1.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {

  content: '';
  position: absolute;
  top: 0;
  left: 0%;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, transparent 0%, rgba(#000000, 0.8) 120%);
  background-blend-mode: darken;
  opacity: 0;
  transform: translateY(50%);
  transition: 1s 3s $returnEasing;
}
}

#header {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 13px;
  font-weight: 200;
  text-shadow: rgba(black, 2.5) 2 3px 25px;
}

</style>
