<template>
  <div id="MoviesPopularView">
    <hr>
    <div class="d-flex flex-wrap justify-content-between">
      <MovieListItem
        v-for="(movie, index) in paginatedMovies" :key="index" 
        :movie="movie"
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
import MovieListItem from '@/components/MovieListItem'

export default {
  name: 'MoviesPopularView',
  components: {
    MovieListItem
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
    }
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
    paginatedMovies() {
      const startIndex = (this.currentPage - 1) * 10;
      const endIndex = this.currentPage * 10;
      return this.movies.slice(startIndex, endIndex);
    },
    visiblePages() {
      const visiblePageCount = 10;
      let startPage = Math.max(1, this.currentPage - Math.floor(visiblePageCount / 2));
      const endPage = startPage + visiblePageCount - 1;

      if (endPage > this.totalPages) {
        startPage = Math.max(1, this.totalPages - visiblePageCount + 1);
      }

      // 데이터가 없는 페이지 번호를 필터링합니다.
      return Array(endPage - startPage + 1)
        .fill()
        .map((_, index) => startPage + index)
        .filter((page) => page <= this.totalPages);
    },
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasNextPage() {
      return this.currentPage < this.totalPages;
    }
  },
  data() {
    return {
      totalPages: Math.ceil(this.$store.state.movies.length / 10),
      currentPage: 1
    }
  }
}
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
