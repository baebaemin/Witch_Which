### 05.19 민경

- **[HomeView] CARD SWIPING [기능: 75% / 스타일링: 50% - 우선순위 낮음]**<br>
유저에게 제공할 질문지의 개수만큼 카드가 쌓여있으며, 왼쪽과 오른쪽으로 스와이핑해 선택할 수 있다.
    - ex. 카드의 content(질문지)가 ‘반복되는 일상은 …’ 이라면, 
    왼쪽으로 스와이핑: ‘끔찍하고 지루해. 탈출하고 싶어’라는 문장이 카드 위에 띄워짐
    오른쪽으로 스와이핑: ‘안정적이고 편안해’라는 문장이 카드 위에 띄워짐
    - 질문 완료시 user의 recommendedMovieList에 응답별 지정된 movie_id / acter_id / genre_id가 쌓일 예정이다
        
        http://drive.google.com/uc?export=view&id=1OzmQ4EfGnlBTO01GhNxeVVkbfAxvpH25
        

- **[HomeView] BACKGROUND [완료]** <br>
별 객체들이 뷰포트를 벗어나는 범위에서 이동하다보니 스크롤의 상하좌우 범위가 뷰포트를 벗어나는 현상이 발생했다. `overflow-y: scroll; overflow-x: hidden;` CSS 적용으로 좌우로 스크롤 현상이 없게 제한하였다.

- **[HomeView] Landing Page Welcome Message [기능: 완료 / 스타일링: 25% - 우선순위 낮음]** <br>
수정구 이미지 위로 마우스를 호버하면 Welcome Message의 각 character가 다른 순서와 속도로 페이드인, 페이드아웃된다. 이미지와 메세지의 크기 및 위치를 수정하고 싶으나 우선 기본 기능이 모두 완료되면 수정해볼 예정이다.
    
    http://drive.google.com/uc?export=view&id=1-AJi8eg7-K5zoR25RuwenRZACylHsAvX
    
- [DOC] (본인의 이해를 위한…) 컴포넌트 구조 업데이트 [완료]
    
    http://drive.google.com/uc?export=view&id=1WlTSdHlNFSEtlAMJvla8auzr-uZjnLiG
    
    새로운 컴포넌트와 뷰 생성시 계속 쌓을 예정
    

- **TIL**
    - body에 overflow 속성 적용으로 스크롤 방향 및 제한 컨트롤하기
    - SCSS(Sassy CSS ㅎ.. 정말 ‘짱멋진’이라는 뜻이라니…) 사용: 중괄호+세미콜론 형식
    - 즉시 실행 함수(IIFE, Immediately Invoked Function Expression)
    전역 스코프를 오염시키지 않고 모듈을 구성하거나 변수를 보호할 수 있다.
    `(() => { ... })()` 형식으로, 함수를 정의하고 즉시 실행하여 그 결과를 반환.
    `() => { ... }`는 화살표 함수를 정의하고, `()`는 해당 함수를 즉시 실행하기 위해 괄호로 감싼 것