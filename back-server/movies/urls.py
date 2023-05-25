from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_list),
    path('genres/', views.genre_list),
    # Review URLs
    path('<int:movie_id>/reviews/', views.review_list),
    path('reviews/<int:review_id>/', views.review_detail),

    # Comment URLs
    path('reviews/<int:review_id>/comments/', views.comment_list),
    path('reviews/comments/<int:comment_id>/', views.comment_detail),
    
    path('<int:movie_id>/like/', views.movie_like),

    # Questions
    path('questions/OTO/', views.question_oto_list),
]