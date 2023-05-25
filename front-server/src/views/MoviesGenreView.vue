<template>
  <div id="MoviesGenreView">
    <h1 class="mb-5" style="text-align:center;">{{ genreName }}</h1>
    <hr>
    <div class="d-flex flex-wrap justify-content-between">
      <MovieListItem
        v-for="(movie, index) in paginatedMovies"
        :key="index"
        :movie="movie"
        :genre="movie_genre_id"
      />
    </div>
    <div class="pagination mt-3" v-if="totalPages > 1">
      <button class="arrow" @click="goToPreviousPage" :disabled="currentPage === 1 || !hasPreviousPage">
        &lt;
      </button>
      <button
        v-for="pageNumber in visiblePages"
        :key="pageNumber"
        :class="{ active: pageNumber === currentPage }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </button>
      <button class="arrow" @click="goToNextPage" :disabled="currentPage === totalPages || !hasNextPage">
        &gt;
      </button>
    </div>
    <hr>
    <div class="d-flex justify-content-end">
      <h5 @click="goToContents">[뒤로가기]</h5>
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem';

export default {
  name: 'MoviesGenreView',
  components: {
    MovieListItem,
  },
  methods: {
    goToContents() {
      this.$router.push({ name: 'MoviesView' });
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    goToPreviousPage() {
      if (this.currentPage > 1 && this.hasPreviousPage) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages && this.hasNextPage) {
        this.currentPage++;
      }
    },
  },
  computed: {
    movies() {
      console.log(this.$store.state.movies)
      return this.$store.state.movies;
    },
    movie_genre() {
      return this.$route.params.genreName;
    },
    movie_genre_id() {
      let genre_id = null;
      for (let i = 0; i < this.$store.state.genre_list.length; i++) {
        if (this.$store.state.genre_list[i].name == this.movie_genre) {
          genre_id = this.$store.state.genre_list[i].id;
          break;
        }
      }
      return genre_id;
    },
    genre_movies() {
      const c_movies = this.movies.filter((movie) => {
        if(movie.genre_ids !== undefined){
          if (movie.genre_ids.includes(this.movie_genre_id)) {
            return movie;
          }
        }
      });
      console.log(c_movies)
      return c_movies;
    },
    paginatedMovies() {
      const startIndex = (this.currentPage - 1) * 10;
      const endIndex = this.currentPage * 10;
      return this.genre_movies.slice(startIndex, endIndex);
    },
    visiblePages() {
      const visiblePageCount = 10;
      let startPage = Math.max(1, this.currentPage - Math.floor(visiblePageCount / 2));
      let endPage = startPage + visiblePageCount - 1;

      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - visiblePageCount + 1);
      }

      return Array(endPage - startPage + 1)
        .fill()
        .map((_, index) => startPage + index);
    },
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasNextPage() {
      return this.currentPage < this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.genre_movies.length / 10);
    },
  },
  data() {
    return {
      genreName: '',
      currentPage: 1,
    };
  },
  created() {
    this.genreName = this.$route.params.genreName;
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.pagination button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  background-color: #f0f0f0;
  margin-right: 15px; /* 버튼 사이의 간격을 조정하세요 */
  cursor: pointer;
}

.pagination button.arrow {
  font-size: 20px;
}

.pagination button.active {
  background-color: #888;
  color: #fff;
}
</style>