### 05.20 민경

- **[Git] 파일 합치기 + branch 나누기 [완료]**<br>
프로젝트 첫 시작부터 진행했어야 했는데 **😅**

- **[AppView] 별 뿌리기 오류(이동하는 별이 html 요소들 밀어내는 이슈) 해결**<br>
천천히 이동하는 배경의 별이 html 요소들을 밀어내느라 새로고침 할 때마다 콘텐츠가 화면 바깥으로 사라졌다. CSS가 적용되는 범위를 하나씩 뜯어보면서 해결하였다.

- **[HomeView] 카드 선택시 해당 영화 user 정보에 스택 [진행 50% - 로직은 짰고.. 실제 DB랑 연결 예정]**<br>
user의 recommendedMovieList에 답지별 지정된 movie_id를 저장했다. 만약 답지에 movie_id가 여러 개라면 그중 랜덤으로 movie_id를 뽑아 저장한다.

    https://drive.google.com/file/d/1YcS_MjiSg-fW2MeWMNMLKUaSrRpijXgl/view?usp=sharing

- **[ProfileView/ ProfileDeque]**
    - **user가 추천받은 영화 개수만큼 카드 보여주기 [완료]**
    - **hidden sidebar 구현 [진행 - 50%]** <br>
    부트스트랩을 활용하여 만들었다. sidebar 안에 들어갈 화면 구성과 라우팅 설정을 이어서 해야 한다.
    - **카드 위에 마우스 hover시 카드 크기가 커지는 기능 [완료]**
    

<aside>
🏆 TIL

</aside>

- dispatch로 actions의 함수 호출시 인자를 여러 개 넣고 싶으면 중괄호로 묶어주기<br>
ex. `this.$store.dispatch('addMovieToRecommendedList', { cardIdx, side })`

- p태그 안의 카드 요소를 확대하는 애니메이션을 적용하려 했으나 아무런 효과가 없었다. p태그는 텍스트 요소이기 때문에 div나 span과 같은 컨테이너 요소로 변경해야 한다.
- 형제 선택자
    - `+` 선택자: 특정 요소의 바로 다음 형제 요소를 선택. 
    ex) `.card.hover + .card`는 `.card.hover` 요소의 다음 형제 요소 중 `.card` 클래스를 가진 요소를 선택한다.
    - `~` 선택자: 특정 요소의 다음 형제 요소 중에서 모든 요소를 선택. 
    ex) `.card.hover ~ .card`는 `.card.hover` 요소 다음에 오는 모든 `.card` 클래스를 가진 형제 요소를 선택한다.