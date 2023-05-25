### 05.18 민경

- **프로젝트 문서 작성 [진행 - 40%]**<br>
이전 기수의 최종 프로젝트 소개 문서를 참고하여 다음과 같은 항목을 우리의 서비스 소개 문서에 적용하였다. (밑줄: 작성 완료 - 물론 프로젝트가 진행되며 계속 업데이트 될 것이다)
    - 정리 완료: 팀원소개, 팀원간의 약속, 필수 요구 사항, ERD, 컴포넌트 구조, UI 디자인
    - 정리 미완: 서비스 개요, 목표, 서비스 플로우 차트, Tech Stack
    - 개발 중 채워나갈 항목: 개발일지, 이슈 관리, 서비스 구현, TroubleShooting
    
- **프로젝트 이름 짓기 [완료: Witch Which]**<br>
우리 팀의 영화 추천 서비스는 타롯점의 카드가 알려주는 운명처럼, 질문지에 대한 유저의 swiping을 통해 영화를 추천해주고 수집의 대상이 될 ‘카드’가 메인 아이템이다. (랜딩 페이지에는 수정구가 user를 안내한다) 카드라는 아이템과 연관성이 높은 키워드 중 ‘witch(마녀)’와 ‘어느 영화를 골라줄까~’의 의미가 함축된 ‘which’의 발음이 비슷한 것에서 착안하여 ‘윗치위치(Witch Which)’라는 프로젝트명이 도출되었다.
    
    (Witch Which 가 좋을지, Which Witch가 좋을지 고민 중이다)
    

- **컴포넌트 구조 작성 [완료]**<br>
    
    https://www.figma.com/file/ObHM4zLi9Z2946zmgbXvbF/%EC%98%A4%EB%8A%98%EC%9D%98-%EC%98%81%ED%99%94-_-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B5%AC%EC%A1%B0?type=whiteboard&node-id=0-1&t=StKplqJKvqrnRsqc-0
    
- **Front-End Developing [1st Step: 기본 기능 구현 - 80% 진행]**<br>
    
    함께 ERD 정리와 컴포넌트 구조 작성을 마친 후, 서영이는 Back-End Part(Django)를, 나는 Front-End Part(Vue.js)를 분담하였다. router 설정과 페이지 뷰에 따른 views, components 파일 생성 및 연결의 기본 기능만 작성하는 건데도 하루를 모두 써버렸다. 아직 장고 DB에 연결할 수 없어 임시로 PlaceHolder값을 state에 넣어두었으며, profileView의 SideBar를 제외하고 화면 흐름의 준비가 완료되었다.
    
    http://drive.google.com/uc?export=view&id=13p1dDNGI1iSyrG0yUGsG9A_2gaecAj3M
    
    추가로 기본 기능 완료해야할 목록: 
    
    - 모달 추가 - Login / SignUp / myDeque에 특정 영화 추가
    - 페이지 추가 / 리뷰에 코멘트 남기는 상세 페이지
    
- **TIL**
    - **라우터뷰 중첩** <br>
    router에 children 속성을 추가하여 router view를 중첩하여 사용하는 방법을 배웠다.
    - **jQuery** <br>
    영화 이미지 대체용으로 임시로…~~그리고 재미로..~~ 카드의 색상을 gradient로 해보고싶었다. jQuery를 조금 배워보면서 스타일 지정은 created가 아닌 mounted() Hook 안에서 작성하는게 좋다는 것도 알게 되었다. (DOM과 연결된 이후여야 하기 때문에!)
    - **require()** <br>
    영화 이미지 대체용으로 asset에 넣은 이미지를 사용하려 했다. 상대 경로로 이미지를 지정할 때, img 태그에서 직접 경로를 지정하는 것이 아닌, require()를 사용해야 한다는 것을 배웠다.
    ex. `<img :src="require('@/assets/profile1.png')" alt="">` 
