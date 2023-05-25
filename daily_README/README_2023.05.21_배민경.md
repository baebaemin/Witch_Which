### 05.21 민경
---
- [**ProfileView/ ProfileDeque**] **recommendedMovieList에 movie obj 저장 [기능 - 90% 진행]**
  - 문자열로 movie title만 받아서 카드에 띄웠던 걸 homeview에서 카드 스와이핑을 통해 user가 영화 id를 추천받으면 해당 id를  axios 요청을 통해 온전한 movie data를 받아왔다. 이로써 posterPath로 프로필화면에서 영화 이미지들을 띄울 수 있게 됐다.
  - 이후 할 일 :  추천받은 movieList가 중복 되지 않게 해야한다
  
---
- **[MovieDetailView] 새로고침시 movie detail 불러오지 못하는 문제 해결**<br>
params 값 중 movie_id가 Number가 아닌 String이라 array helper filter에서 `return [elem.id](http://elem.id/) === this.$route.params.movie_id`의 결과가 계속 false가 나와서 무비 디테일 데이터를 받아오지 못했다. `return [elem.id](http://elem.id/) == this.$route.params.movie_id` 로 변경해서 자동 타입 형변환으로 같은 movie_id가 발견되었을 때 데이터를 반환할 수 있도록 문제를 해결하였다.
---
- **[HomeView/ SelectedCards] 선택된 카드들 3개 화면에 띄워주기 [완료]**
[https://drive.google.com/file/d/1DM-1aBpk1cdAPlVJoH1_DMAz2iVgssPE/view?usp=sharing](https://drive.google.com/file/d/1DM-1aBpk1cdAPlVJoH1_DMAz2iVgssPE/view?usp=sharing)
정말 … 뿌듯했다 … ㅜㅜ ProfileDeque에서도 활용해볼 생각이다.
    - HomeView에서 카드 추천에 따른 movie_id가 axios 요청으로 객체가 쌓이면서, 객체 리스트 중 3개를 랜덤으로 반환해서 PosterPath를 활용해 이 카드에 적용시키는 것 까지 해야 한다.

---
<aside>
📻 **TIL**

</aside>

- $ref :: 특정 영역에 **`focus`**를 주는 등의 DOM에 직접 접근하여 컨트롤 해야 될 경우 사용하는 속성(자바스크립트의 querySelector와 같은 역할)
    1. 접근하고 싶은 태그에 **`ref`**속성명을 할당 한다.
    2. **`ref`**는 **`id`**처럼 중복이 불가능 하다.
    
    ```jsx
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card"> // card-wrap에 ref 속성 할당
    (...)
    
    mounted() {
      this.width = this.$refs.card.offsetWidth;
      this.height = this.$refs.card.offsetHeight;
    }, 
    // 연결되었을 때 마우스가 hover될때 tilt에 사용할 width와 height를 
    // card-wrap의 offsetWidth&Height에 연결
    ```
    
- 배경 객체가 앞의 요소들의 위치나 event에 영향을 줄 때 z-index로 제일 하단에 지정해주기

  ```jsx
  #stars-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
    }
  ```

- **cubic-bezier()** :: CSS에서 **transition** 속성 혹은 **transition-timing-function** 속성에서 전환 시작과 끝까지의 효과를 제어하는데 쓰임. 4개의 인자를 하나씩 바꿀수도 있지만 [https://matthewlein.com/tools/ceaser](https://matthewlein.com/tools/ceaser) 이 사이트에서 실시간으로 확인하면서 ease in/out 의 정도를 조절할 수 있다.