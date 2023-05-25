# 5/20 서영

## review 작성하기 & 화면 출력하기
``` js
createReview() {
    const stars = this.stars
    const content = this.content

    if (!stars) {
      alert('별점을 입력해주세요.')
      return
    } else if (!content) {
      alert('내용을 입력해주세요.')
      return
    }
    axios({
      method: 'post',
      url: `${API_URL}/movies/${this.$route.params.movie_id}/reviews/`,
      data: { stars, content },
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
    .then(() => {
      this.$router.push({ name: 'MovieDetailView'})
    })
    .catch((err) => {
      console.log(err)
    })
    },
```
``` js
getReviews(context, id) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${id}/reviews/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          console.log(res.data)
          context.commit('GET_REVIEWS', res.data)
        })
        .catch((err) => {
        console.log(err)
      })
    },
```
$route.params.movie_id로 movie_id를 받아와서 게시글을 작성할 수 있도록 코드를 작성했다.

## 로그인을 할 때만 데이터를 새로 받아오도록 수정
``` js
SAVE_TOKEN(state, token) {
      state.token = token
      router.push({name:'HomeView'})
      this.dispatch('getGenres');
      this.dispatch('getMovies');
    },
```
로그인을 하는 코드에 getGenres와 getMovies를 실행시켜 로그인 함수가 작동할 때만 데이터를 새로 받아오도록 코드를 작성하였다.
## detail 페이지 새로고침 시 오류 발생하던 것 수정
``` js
movie() { // 여기에 무비 디테일 - 하나의 온전한 영화 Object 가져오기
      const selected_movie = this.$store.state.movies.filter(elem => {
        return elem['id'] == this.$route.params.movie_id
      })
      console.log('statwe', this.$store.state.movies)
      console.log('여기!!!', selected_movie)
      return selected_movie
      // return this.$store.state.movies[this.$route.params.movie_id-1]
    },
```
기존에 return elem['id'] === this.$route.params.movie_id 여서 속성까지 동일한 데이터를 가져와야 했기 때문에 오류가 발생했었다.
## 데이터 받아오는 방법 수정
``` js
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
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
},          

getMovies(context) {
  const requests = [];
  for (let i = 1; i < 6; i++) {
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
          movieDataList.push(movie_data);
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
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
},
```
원래는 로그인을 해서 getGenres와 getMovies 함수가 실행 될 때마다 db를 모두 삭제하고 새로 데이터를 받아왔었다.
하지만 이런 방식으로 하면 작성했던 review 데이터들이 모두 삭제되는 현상이 나타났다.
때문에 delete하는 부분을 없애고 기존 데이터에 받아오는 데이터를 덮어씌우는 방식으로 코드를 작성했다.