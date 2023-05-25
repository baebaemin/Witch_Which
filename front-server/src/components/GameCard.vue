<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }"
    class="card"
    :style="{ transform: transformString }"
    style="background-color: rgb(245, 245, 245, 0); padding: 25px;"
  >
  
    <h1 class="cardTitle" style="top: 3%;">Q{{nthCard}}.</h1>
    <h4 class="cardTitle" style="line-height: 160%;"> {{ card }}</h4>
    <div class="left-indicator" style="font-size: 27px; color: white; font-style: italic; padding: 10%;" v-show="showLeftIndicator">{{ getLeftAnswer }}</div>
    <div class="right-indicator" style="font-size: 27px; color: white; font-style: italic; padding: 10%;" v-show="showRightIndicator">{{ getRightAnswer }}</div>
  </div>
</template>



<script>

// movieList = [{id: 123, name: 'A'}, {id: 123, name: 'B'}, {id: 13, name: 'C'}]

// .then((res) => {
//   console.log(res) // 선택할때마다 res = 그 선택한 영화 하나
//   const movie = res.data
//   this.state.All_users[res.data.user_id-1].user_movies.push(movie)
//     // 로그인중인 유저의 user_movies_push(movie)

//   const movieList = this.state.All_users[res.data.user_id-1].user_movies
//   this.state.All_users[res.data.user_id-1].user_movies = _.uniqBy(movieList, "id")

import interact from "interactjs";
const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";
// const thisUser = this.$store.state.

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100
  },
  props: {
    card: {
      type: String,
      required: true
    },
    isCurrent: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0
      },
      showLeftIndicator: false, // +
      showRightIndicator: false,
      nthCard: 1,
    };
  },
  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }
      return null;
    },

    getLeftAnswer() {
      const question = this.$store.state.questionOTOList.find(q => q.question === this.card);
      return question ? question.leftAnswer : '';
    },
    
    getRightAnswer() {
      const question = this.$store.state.questionOTOList.find(q => q.question === this.card);
      return question ? question.rightAnstwer : '';
    },
  },
  
  mounted() {
    const element = this.$refs.interactElement;

    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false;
      },

      onmove: event => {
        const {
          interactMaxRotation,
          interactXThreshold
        } = this.$options.static;
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;

        let rotation = interactMaxRotation * (x / interactXThreshold);

        if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });

        // 인디케이터 생성 여부
        if (x > 50) {
          this.showRightIndicator = true;
          this.showLeftIndicator = false;
        } else if (x < -50) {
          this.showLeftIndicator = true;
          this.showRightIndicator = false;
        } else {
          this.showLeftIndicator = false;
          this.showRightIndicator = false;
        }
      },
      onend: () => {
        const { x, y } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options.static;
        this.isInteractAnimating = true;

        if (x > interactXThreshold) this.playCard(ACCEPT_CARD);
        else if (x < -interactXThreshold) this.playCard(REJECT_CARD);
        else if (y > interactYThreshold) this.playCard(SKIP_CARD);
        else this.resetCardPosition();
      }
    });
  },

  beforeDestroy() {
    interact(this.$refs.interactElement).unset();
  },

  methods: {
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
        this.$emit("hideCard", this.card);
      }, 300);
    },

    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation
      } = this.$options.static;

      this.interactUnsetElement();

      switch (interaction) {
        case ACCEPT_CARD:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation
          });
          this.$emit(ACCEPT_CARD);
          break;
        case REJECT_CARD:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation
          });
          this.$emit(REJECT_CARD);
          break;
        case SKIP_CARD:
          this.interactSetPosition({
            y: interactOutOfSightYCoordinate
          });
          this.$emit(SKIP_CARD);
          break;
      }

      this.hideCard();
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, y, rotation };
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.isInteractDragged = true;
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

$cardsTotal: 3;
// $cardsWidth: 30px;
$cardsPositionOffset: 55vh * 0.10;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.5em;

.card {
  @include card();
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-center();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.3);
  }

  display: flex;
  flex-direction: column;
  max-height: 550px;
  margin: auto;
  font-size: 1rem;
  font-weight: 200;
  color: $c-white;
  background-image: linear-gradient(
    -180deg,
    $primary-gradient-start 2%,
    $primary-gradient-end 100%
  );
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  height: 100vw;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  position: fixed;
  top: 10%;
  left: 0;
  right: 0;
  padding: 10%;
  font-size: $fs-card-title;
  
}

.card.isCurrent:not(.isAnimating) {
  
  box-shadow: 
    rgba(rgb(200, 255, 61), 0.2) 0 0 0 1px,
    rgba(rgb(255, 255, 255), 0.1) 0 0 40px 5px,
    
    rgba(black, 0.66) 0 30px 60px 0, inset #000000 0 0 0 5px,
    inset rgba(255, 255, 255, 0.568) 0 0 0 6px;
}


@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
      border: solid 0.5px rgb(179, 179, 179);
      color: rgb(235, 255, 137);

    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: rgba(0, 0, 0, 0);
        border: solid 0.25px rgb(44, 44, 44);
      background-color: $c-red-25;
    } @else if $i == 2 {
      color: rgba(0, 0, 0, 0);
      background-color: $c-red-50;
        border: solid 0.25px rgb(83, 83, 83);

    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>
