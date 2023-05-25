import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView'
import ContentView from '@/views/ContentView'
import ProfileView from '@/views/ProfileView'

import MoviesView from '@/views/MoviesView'
import MoviesPopularView from '@/views/MoviesPopularView'
import MoviesGenreView from '@/views/MoviesGenreView'
import MovieDetailView from '@/views/MovieDetailView'
import ReviewDetailView from '@/views/ReviewDetailView'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/content', // 바로 프로필 띄워주고싶은데 .. !
    redirect: '/content/profile/:userName',
    name: 'ContentView',
    component: ContentView,
    children: [
      {
        path: '/content/profile/:userName',
        name: 'ProfileView',
        component: ProfileView
      },
      {
        path: '/content/movies',
        name: 'MoviesView',
        component: MoviesView,
      },
      {
        path: '/content/movies/popular',
        name: 'MoviesPopularView',
        component: MoviesPopularView,
      },
      {
        path: '/content/movies/:genreName', // 장르이름으로 바꿔야 함
        name: 'MoviesGenreView',
        component: MoviesGenreView,
      },
      {
        path: '/content/movies/detail/:movie_id',
        name: 'MovieDetailView',
        component: MovieDetailView,
      },
      {
        path: '/content/movies/:movie_id/review/:review_id',
        name: 'ReviewDetailView',
        component: ReviewDetailView,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
