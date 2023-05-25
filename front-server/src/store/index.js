import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'
// import router from '../router'
// import { forEach } from 'lodash'
const API_URL = 'http://127.0.0.1:8000'
const API_KEY = 'a5e749f5c3598f0d571e685b7a958f50'
const TMDB_URL = 'https://api.themoviedb.org/3/movie/popular'
const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list'
const MOVIE_URL = 'https://api.themoviedb.org/3/movie' // 뒤에 /{external_id} 있어야 함  
 
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    // 이곳의 모든 state 값은 장고에서 API 요청을 통해 데려올 것임. 지금은 placeholder용
    genre_list: [], // 19개 장르 담기
    genres: [], 
    movies: [], // 모든 영화 데이터 들어있음
    OTOMovieIdList: [],
    questionOTOList: [],
    visibleCards: [],
    selectedCards: [],
    reviews: [], // 모든 리뷰들 들어있음
    token: null,
    comments: [], // 모든 댓글들 들어있음
    me: '',  // 로그인 한 유저
    follow: [], // follow 관련 데이터
    genre_recommend_list: [], // 장르 기반 추천 데이터 들어감
    All_users: [], // 모든 유저 데이터 들어감
    user_special_movies: [], // 유저가 선택한 스페셜 영화
    user_deque_movies: [], // 유저 댁 들어가는 배열
    user_like_movies: [], // 유저가 좋아요 한 무비
    user_recommended : [], // 모르겠음,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false // state.token이 true면 true 반환 false면 false
    },
    updated(state) {
      return state.update_review
    },
    // visibleCards() {
    //   const tempList = []
    //   this.questionOTOList.forEach(q => {
    //     console.log('q', q.question, tempList)
    //   });
    // }
  },
  mutations: {
    addToRecommendedMovieList(state, movie) { 
      const selectedCard = {
        dataImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        backImage: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        movieTitle: movie.original_title,
        movieContents: `${movie.title} (${movie.release_date.slice(0, 4)})`,
        isRevealed: false
      }
      state.selectedCards.push(selectedCard)  // 화면에 뿌리기용
      // DB 전송용

      // console.log(state.selectedCards)
    },

    GET_QUESTION_OTO(state, data){
      const tempMovieIdList = []
      data.forEach(q => { // OTOMovieIdList에 movieId들 넣으면서 questionOTOList에도 넣기
        const leftMovieId = q.leftMovieId
        const rightMovieId = q.rightMovieId
        if (leftMovieId) {
          tempMovieIdList.push(leftMovieId)
        }
        if (rightMovieId) {
        tempMovieIdList.push(rightMovieId)
        }
      });
      const set = new Set(tempMovieIdList) // 중복값이 있는 배열을 Set 객체로 만들어서 중복을 제거
      state.OTOMovieIdList = [...set]     // Spread Operator(전개연산자)를 사용하여 Set 객체를 다시 배열로 변환
      // console.log('OTOMovieIdLIst in vuex', state.OTOMovieIdList)
      this.state.visibleCards = [] // reset

      // questionOTOList & visibleCards
      const newData = [];
      for (let i = 0; i < 5; i++) {
        const randomData = _.sample(data);
        newData.push(randomData);
        this.state.visibleCards.push(randomData.question)
      }     
      state.questionOTOList = newData

      console.log('questionOTOList', state.questionOTOList)
      console.log('visibleCards', state.visibleCards)
    },
    PUT_OTO_MOVIE(state, data){
      for(let i=0; i<data.length; i++) {
        if(state.movies.includes(data[i])){
          continue
        }else {
          state.movies.push(data[i])
        }
      }
    },
    GET_MOVIES(state, data){
      for(let i=0; i<data.length; i++) {
        if(state.movies.includes(data[i])){
          continue
        }else {
          state.movies.push(data[i])
        }
      }
    },
    GET_GENRES(state, data){
      state.genre_list = []

      data.forEach(elem => {
        state.genre_list.push(elem)
      })
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      // router.push({name:'HomeView'})  안녕 ~~
      this.dispatch('getGenres');
      this.dispatch('getMovies');
      this.dispatch('putOTOMovies');
    },
    SAVE_REVIEWS(state, review) {
      console.log(state.reviews)
      let star = ''
      for(let i=0; i<review.stars; i++) {
        star += '⭐'
      }
      review.stars = star
      console.log(review)
      state.reviews.push(review)
    },
    UPDATE_REVIEW(state, data) {
      state.reviews = state.reviews.map(review => {
        if(data.id === review.id){
          return data
        }
        return review
      })
    },
    DELETE_REVIEW(state, data) {
      for (let i=0; i<state.reviews.length; i++) {
        if (state.reviews[i].id == data) {
          state.reviews.splice(i, 1)
        }
      }
    },
    SAVE_COMMENTS(state, data) {
      // console.log(data)
      state.comments.push(data)
    },
    UPDATE_COMMENT(state, data) {
      state.comments = state.comments.map(comment => {
        if(data.id === comment.id) {
          return data
        }
        return comment
      })
    },
    DELETE_COMMENT(state, data) {
      for (let i=0; i<state.comments.length; i++) {
        if (state.comments[i].id == data) {
          state.comments.splice(i, 1)
        }
      }
    },
    LOGOUT(state) {
      state.me = null
      state.token = null
      state.follow = []
      state.genre_recommend_list = []
      state.All_users = []
      state.user_recommended = []
      state.user_deque_movies = []
      state._movies = []
      state.user_special_movies = []
    },
    FOLLOW(state, data) {
      state.follow = []
      state.follow = data
    },
    GENRE_RECOMMEND(state, data) {
      console.log(data)
      state.genre_recommend_list.push(data)
    },
    USER(state, data) {
      state.All_users = []
      state.All_users.push(...data)
      for (let i=0; i<data.length; i++) {
        if (data[i].username == state.me) {
          for (let j=0; j<data[i].user_movies.length; j++) {
            state.user_deque_movies.push(data[i].user_movies[j].id)
          }
        }
      }
    },
    LIKES(state, data) {
      for(let i=0; i<state.user_like_movies.length; i++) {
        if (state.user_like_movies[i].movie_id == data.movie_id) {
          state.user_like_movies[i].isLike = data.isLike
        }
      }
      console.log(state.user_like_movies)
    }
  },
  actions: {
    getQuestionOTO(context) {
      // const questionOTOList = context.state.questionOTOList
      axios({
        url: `${API_URL}/movies/questions/OTO/`,
        method: 'get',
      })
      .then((res) => {
        context.commit('GET_QUESTION_OTO', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    putOTOMovies(context){
      const requests = []
      const OTOMovieIdList = context.state.OTOMovieIdList
      for (let i=0; i<OTOMovieIdList.length; i++) {
        requests.push(
          axios({
            url: `${MOVIE_URL}/${OTOMovieIdList[i]}`,
            method: 'get',
            params: {
              api_key: API_KEY,
              language: 'ko-KR'
            }
          })
        )
      }
      Promise.all(requests)
        .then((responses) => {
          const movieDataList = []
          responses.forEach((res) => {
            const movie = res.data
            const genre_list = []
            for(let i=0; i<movie.genres.length; i++) {
              genre_list.push(movie.genres[i].id)
            }
            const movie_data = {
              id: movie.id,
              title: movie.title,
              release_date: movie.release_date,
              popularity: movie.popularity,
              vote_average: movie.vote_average,
              overview: movie.overview,
              poster_path: movie.poster_path,
              genre_ids: genre_list
            }
            movieDataList.push(movie_data)
          })
          context.commit('PUT_OTO_MOVIE', movieDataList);
          const savePromises = movieDataList.map((movieData) => {
            return axios.post(`${API_URL}/movies/`, movieData, {
              headers: {
                Authorization: `Token ${this.state.token}`
              }
            })
          })
          return Promise.all(savePromises)
        })
        .then((res) => {
          console.log('getOTOmovies', res)
        })
        .catch((err) => {
          console.log(err)
        })
    //   OTOMovieIdList.forEach(MovieId => {
    //     axios({
    //       url: `${MOVIE_URL}/${MovieId}`,
    //       method: 'get',
    //       params: {
    //         api_key: API_KEY,
    //         language: 'ko-KR'
    //       }
    //     })
    //     .then((res) => {
    //       const movie = res.data
    //       const movie_data = {
    //         id: movie.id,
    //         title: movie.title,
    //         release_date: movie.release_date,
    //         popularity: movie.popularity,
    //         vote_average: movie.vote_average,
    //         overview: movie.overview,
    //         poster_path: movie.poster_path,
    //         genre_ids: movie.genres
    //       }
    //       context.commit('PUT_OTO_MOVIE', movie_data);
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    //   })
    },
    addMovieToRecommendedList({commit, state}, {cardIdx, side}) { // {commit, state} 

      // let movieIdList
      let movieId
      if (side === 'left'){
        movieId = state.questionOTOList[cardIdx].leftMovieId;
      } else if (side === 'right') {
        movieId = state.questionOTOList[cardIdx].rightMovieId
      }
      
      // 추천해줄 MovieId가 없는 경우 추가하지 않음 
      // movieId 하나 받아서 있을 때만 axios 요청
      if (movieId) {
        axios({
          url: `${MOVIE_URL}/${movieId}`, // 추천한 영화 tmdb에서 가져오기
          method: 'get',
          params: {
            api_key: API_KEY,
            language: 'ko-KR'
          }
        })
        // islogined로 if문 갈라서 false면 오지말고 true면 실행
        .then((res) => {
          const movie = res.data // tmdb 형태
          console.log(res)
          commit('addToRecommendedMovieList', movie);
          axios({ 
            url: `${API_URL}/movies/${res.data.id}/user_deque/`, // 영화 mtm에 저장
            method: 'post',
            data: {movie},
            headers: {
              Authorization: `Token ${state.token}`
            }
        })
        .then((res) => {
          console.log(res)
          if (!this.state.user_deque_movies.includes(movieId)) {
            console.log(movieId, '---------------------1')
            this.state.user_deque_movies.push(movieId)
            const user_like = {
              isLike: false,
              movie_id: movieId
            }
            this.state.user_like_movies.push(user_like)
          }
        })
        .catch((err) => {
          console.log(err)
        })
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    getGenres(context) {
      axios({
        url: GENRE_URL,
        method: 'get',
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        }
      })
      .then((res) => {
        const genres = res.data.genres;
        context.commit('GET_GENRES', genres)

        const genrePromises = genres.map(genre => {
          return axios.post(`${API_URL}/movies/genres/`, { id: genre.id, name: genre.name }, {
            headers: {
              Authorization: `Token ${context.state.token}`
            }
          });
        });

        return Promise.all(genrePromises);
      })
      .then((res) => {
        res
        console.log('getGenres', res);
      })
      .catch((err) => {
        console.log(err);
      });
    },          

    getMovies(context) {
      const requests = [];
      for (let i = 1; i < 20; i++) {
        requests.push(
          axios({
            url: TMDB_URL,
            method: 'get',
            params: {
              api_key: API_KEY,
              language: 'ko-KR',
              page: i
            }
          })
        );
      }

      Promise.all(requests)
        .then((responses) => {
          const movieDataList = [];
          responses.forEach((res) => {
            const data = res.data.results;
            data.forEach(movie => {
              const movie_data = {
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                popularity: movie.popularity,
                vote_average: movie.vote_average,
                overview: movie.overview,
                poster_path: movie.poster_path,
                genre_ids: movie.genre_ids
              };
              if (movie_data.poster_path !== null) { 
                movieDataList.push(movie_data);
              }
            });
          });

          context.commit('GET_MOVIES', movieDataList);

          const savePromises = movieDataList.map((movieData) => {
            return axios.post(`${API_URL}/movies/`, movieData, {
              headers: {
                Authorization: `Token ${this.state.token}`
              }
            });
          });

          return Promise.all(savePromises);
        })
        .then((res) => {
          res
          console.log('getMovies', res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
      .then(res => {
        console.log(res)
        this.state.me = username
        context.commit('SAVE_TOKEN', res.data.key)
        axios({
          method:'get',
          url: `${API_URL}/accounts/`,
          headers: {
            Authorization: `Token ${this.state.token}`,
          }
        })
        .then((res) => {
          context.commit('FOLLOW', res.data)
          context.commit('USER', res.data)
          for (let i=0; i<this.state.All_users.length; i++) {
            if (this.state.All_users[i].username === this.me) {
              this.state.user_recommended = this.state.All_users[i].user_movies
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
    },

    logIn(context, payload) {
      const username = payload.username
      const password = payload.password
      axios({
        method : 'post',
        url : `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
      .then(res => {
        this.state.me = username
        context.commit('SAVE_TOKEN', res.data.key)
        axios({
          method:'get',
          url: `${API_URL}/accounts/`,
          headers: {
            Authorization: `Token ${this.state.token}`,
          }
        })
        .then((res) => {
          context.commit('FOLLOW', res.data)
          context.commit('USER', res.data)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      })
      .catch(err => console.log(err))
    },

    createReviews(context, data) {
      console.log(data)
      axios({
        method: "post",
        url: `${API_URL}/movies/${data.movie_id}/reviews/`,
        data: { 
          'stars': data.stars, 
          'content': data.content },
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      })
        .then((res) => {
          console.log(res.data)
          context.commit('SAVE_REVIEWS', res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateReviews(context, data) {
      axios({
        method: "put",
        url: `${API_URL}/movies/reviews/${data.review_id}/`,
        data: { 
          'stars': data.stars, 
          'content': data.content },
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      })
        .then((res) => {
          console.log(res.data)
          context.commit('UPDATE_REVIEW', res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteReview(context, reviewId) { 
      axios({
        method:"delete",
        url: `${API_URL}/movies/reviews/${reviewId}/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      })
      .then((res) => {
        console.log('deleted', res)
        context.commit('DELETE_REVIEW', reviewId)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // path('reviews/<int:review_id>/comments/', views.comment_list),
    createComments(context, data) {
      axios({
        method: "post",
        url: `${API_URL}/movies/reviews/${data.review_id}/comments/`,
        data: { 
          'content': data.content },
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      })
        .then((res) => {
          context.commit('SAVE_COMMENTS', res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateComments(context, data) {
      // console.log(data)
      axios({
        method: "put",
        url: `${API_URL}/movies/reviews/comments/${data.comment_id}/`,
        data: {'content': data.content },
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        context.commit('UPDATE_COMMENT', res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    },
    //path('reviews/comments/<int:comment_id>', views.comment_detail),
    deleteComment(context, commentId) { 
      axios({
        method:"delete",
        url: `${API_URL}/movies/reviews/comments/${commentId}/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      })
      .then((res) => {
        console.log('deleted', res)
        context.commit('DELETE_COMMENT', commentId)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    logout(context) {
      context.commit('LOGOUT')
    },
    follow(context, username) {
        axios({
          method: 'post',
          url: `${API_URL}/accounts/${username}/follow/`,
          headers: {
            Authorization: `Token ${this.state.token}`,
          }
        })
        .then((res) => {
          console.log('follow', res)
          axios({
            method:'get',
            url: `${API_URL}/accounts/`,
            headers: {
              Authorization: `Token ${this.state.token}`,
            }
          })
          .then((res) => {
            context.commit('FOLLOW', res.data)
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    genre_recommend(context, genre_id) {
      const genre_movie_list = []
      for (let i=0; i<this.state.movies.length; i++) {
        if (this.state.movies[i].genre_ids.includes(genre_id)) {
          genre_movie_list.push(this.state.movies[i])
        }
      }
      console.log(genre_movie_list)
      const genre_movie_id = genre_movie_list[Math.floor(Math.random()*genre_movie_list.length)]
      console.log(genre_movie_id)
      context.commit('GENRE_RECOMMEND', genre_movie_id)
    },
    likes(context, movie) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/${movie.id}/like/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      })
      .then((res) => {
        context.commit('LIKES', res.data)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  modules: {
  },
})
