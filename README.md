# **Witch Which 🧙‍♀️🎬🃏**
## **Django와 Vue.js를 활용한 영화 커뮤니티 웹사이트**


### 🤝팀원

| 이름 | 담당 영역 | Github |
| --- | --- | --- |
| 배민경 | - 프론트엔드(60%) / 백엔드(40%) / 서민의 마지막 이성.. | https://github.com/baebaemin |
| 김서영 | - 프론트엔드(40%) / 백엔드(60%) / 서민의 마지막 감성.. | https://github.com/ksykma |

### **📋 팀원 간의 약속**

1. 나쁜 말 금지 (꼭 해야 한다면 아무도 모르게.. 산 정상 위에 올라가 뱉기)
2. 그날 구현하고자 하는 기능은 최대한 구현하기
3. 밤샘 지양하지만 오늘 따라 불타오른다면 지향
4. GIT HUB Name-Convention 설정해서 지키기
    - [ADD] appname.filename  (ex [user.serializer.py](http://user.serializer.py) ) #file 추가
    - [MOD] appname.filename (ex [user.serializer.py](http://user.serializer.py) 수정내용) #file에서 기능 추가/수정
    - [DEL] appname.filename (ex [user.serializer.py](http://user.serializer.py) 삭제내용) #file에서 기능 삭제
    - [Comment] appname.filename (ex [user.serializer.py](http://user.serializer.py) 수정내용) #코멘트 관련
    - [Design] css 수정
    - [FIX] 수정한 에러
5. README 밀리지 않기, 문서화를 습관화 하자!

---

### 📝Description

- 영화 정보 및 추천 서비스 제공 프로젝트
- ppt : https://www.slideshare.net/ssuser690927/witch-whichpdf
- vid : https://drive.google.com/file/d/1DM-1aBpk1cdAPlVJoH1_DMAz2iVgssPE/view?usp=sharing 
 
 
### 🏆목표

- 영화 데이터 및 사용자 선택 기반 추천 서비스 구성
- 커뮤니티 서비스 구성
- HTML, CSS, JavaScript, Bootstrap, Vue.js, REST API, Database 등을 활용하여 기획한 대로 프로젝트 완성
- 서비스 관리 및 유지 보수

### 📍 필수 요구 사항

| No. | 구분 | 기능 | 구현 정도(⭐⭐⭐⭐⭐) |
| --- | --- | --- | --- |
| 1 | 영화 정보 | TMDB API를 활용하여 영화 데이터 출력 | ⭐⭐⭐⭐⭐ |
| 2 |  | 영화 인기 순위 페이지 | ⭐⭐⭐⭐⭐ |
|  |  | 장르 별 영화 페이지 | ⭐⭐⭐⭐⭐ |
| 4 | 영화 추천 알고리즘 | 유저가 질문에 대해 선택한 데이터 기반 영화 추천 | ⭐⭐⭐⭐ |
| 5 |  | 영화 추천을 위한 다양한 종류의 질문 데이터 작성 | ⭐⭐⭐⭐⭐ |
| 6 | 커뮤니티 | 로그인 유저만 영화에 대한 리뷰 C/R/U/D | ⭐⭐⭐⭐⭐ |
| 7 |  | 로그인 유저만 영화 리뷰에 대한 댓글 C/R/U/D  | ⭐⭐⭐⭐⭐ |
| 8 | 영화 카드 | 유저가 수집한 영화 카드 중 3가지 카드를 대표카드로 설정 가능 |  |

### 🖥 **Tech Stack**
* ### Backend
      - Django
      - Django Rest Framework
      - Python

* ### Frontend
      - HTML
      - Javascript
      - CSS
      - Vue.js
      - SCSS
      - interact.js

### 💾 **데이터베이스 모델링(ERD)**

[https://app.diagrams.net/#G1Sdyho66VYZfVACLStTywmc5fvunYeoyd](https://app.diagrams.net/#G1Sdyho66VYZfVACLStTywmc5fvunYeoyd)

### ❔ **영화 추천 알고리즘**
1. 1대1로 추천해주는 질문과 장르를 기반으로 추천해주는 질문들 약 100가지 생성
2. 해당 데이터를 loaddata로 DB에 입력
4. 1대1 추천의 경우 선택한 질문에 따라 추천해주는 영화가 달라지는데, 해당 영화의 movie_id를 db에 미리 저장해두고 axios로 해당 영화들을 모두 요청하여 MOVIE DB에 저장하여 사용
5. 장르 추천의 경우 선택한 질문에 따라 추천해주는 영화의 장르가 달라지는데, 결과로 출력된 장르id로 axios를 통해 tmdb에서 해당 장르의 영화 중 하나를 받음
6. 질문은 총 5개로 영화 추천은 최소 1개에서 5개까지 가능


### 👍 서비스 대표 기능 (영화 추천 기능)
질문지가 5가지 주어지고 유저가 선택한 답변에 따라 추천
최소 1개~최대 5개까지의 영화를 추천해준 후, user의 개인페이지에 해당 추천 영화를 추가해줌


### ⚙ **컴포넌트 구조**

[https://www.figma.com/file/ObHM4zLi9Z2946zmgbXvbF/오늘의-영화-_-컴포넌트-구조?type=whiteboard&node-id=0-1&t=0cM3X4y9Zb4NZcY2-0](https://www.figma.com/file/ObHM4zLi9Z2946zmgbXvbF/%EC%98%A4%EB%8A%98%EC%9D%98-%EC%98%81%ED%99%94-_-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B5%AC%EC%A1%B0?type=whiteboard&node-id=0-1&t=0cM3X4y9Zb4NZcY2-0)

### **🎨 UI 디자인**

[https://www.figma.com/file/Ux3OhhbeTKZZPbVp4jxM9V/Marrot?type=design&node-id=0-1&t=MZ8lY7T2m9S2ybNv-0](https://www.figma.com/file/Ux3OhhbeTKZZPbVp4jxM9V/Marrot?type=design&node-id=0-1&t=MZ8lY7T2m9S2ybNv-0)

### 💜 느낀점 (날짜별 진행상황은 daily_README 폴더 참조)
#### 배민경
[설계의 중요성]
데이터베이스 모델링과 컴포넌트 구조, 서비스 기획 등 본격적인 개발 작업에 앞선 설계 작업을 프로젝트 시작일로부터 2-3일은 꼬박 걸렸다. 그러나 결코 긴 시간이 아니었고, 충분한 시간을 들여 할 가치가 있었던 것 같다. 특히 시각적으로 컴포넌트 구조를 제작하고 나니 (물론 실제 개발하면서 처음 구조를 짰던 ERD와 컴포넌트 구조 둘 다 지속적으로 업데이트해야했지만) 수많은 XXView.vue 파일과 라우팅 URL과 컴포넌트들을 엮으며 작업할 때 참고할 수 있어서 정말 큰 도움이 되었다.

[아쉬웠던 점]
vuex에서 모듈로 기능들을 분화하지도 못했고, 어떤 기능들은 굳이 store을 거치며 actions -> mutations -> getters 등으로 state의 데이터를 가져다 쓸 필요 없이 바로 해당 컴포넌트의 data에서 가공, 사용해도 좋았는데 습관적으로 vuex를 거쳐가면서 데이터를 활용했다. 그렇게 된 결과, 코드가 스파게티+조각보 코드가 되었다, 하하. 6월 방학(?)때는 클린 코딩을 공부할 겸 이번 프로젝트를 계속 디벨롭, 정리해나가며 코드의 구조도 정리하여 자랑스러운 포트폴리오 중 첫 번째 프로젝트로 발전시키고 싶다.

[뿌듯했던 점] 
싸피에서의 1학기를 마쳐가며 4-5개월간 SSAFY에서의 생활으로 주변 친구들의 작업 성향을 알아갈 수 있었다. 그중에서도 서영이는 무언갈 배우는것에 있어선, 혹은 목표로 하는 기준이 있다면 그걸 충족할때까지 밤을 거뜬히 새고 만다는 점이 나와 비슷했던 동생이었다. 프로젝트를 진행하면서 그러한 지점이 서로에게 응원과 자극이 되어 으쌰으쌰 끝까지 힘을 낼 수 있었다. 마지막 프로젝트 제출일 전까지는 나흘간 잠을 잔 시간을 합하면 7시간이 채 안 될 정도였으니 말이다...! 게다가 마침 서영이는 장고마스터이고, 나 역시 디자인을 전공하고 왔기 때문에 프론트엔드 쪽으로 살짝 더 작업 비중을 늘려나가면서 프로젝트를 하고 싶었기 때문에 둘의 역할분담도 매우 잘 되었던 것 같다. 

#### 김서영
기획을 정말 꼼꼼하게 하였음에도 불구하고 중간중간에 수정해야 하는 일들이 생겼고, 이를 통해 기획을 더 꼼꼼하게 해야겠다는 생각이 먼저 들었습니다. 또한 이론적으로 모두 알고있다고 생각했지만 실제로 사용해보니 어려움이 많았고 잊어버린 것들도 많아 복습이 필요함을 느꼈습니다. 

[어려움을 느꼈던 점]
1. 초반에 axios 요청을 통해 movie 데이터를 불러오는 작업을 하였는데 ManyToMany field를 사용한 경험이 많지 않아 모든 데이터를 제대로 받아오는 데에만 3일정도 걸렸던 것 같습니다. 
2. 중복 라우터, 새로고침, 데이터의 형태 등등 신경 쓸 부분이 많아 쉽다고 생각한 기능들이 생각보다 오래 걸렸습니다.
3. 작업 순서를 생각하며 작업을 진행했어야 했는데 그렇지 못해 작업이 더뎌졌습니다.

항상 느끼지만 프로젝트를 진행하면서 많은 부분을 깨우치고 배우게 되는 것 같습니다. 
프로젝트 시작 전 기획한 기능들을 모두 구현하지는 못했지만 1학기 동안 배운 내용들을 복습하며 구현해냈다는 뿌듯함에 재미있었고 감을 익힐 수 있는 좋은 경험이었습니다.
