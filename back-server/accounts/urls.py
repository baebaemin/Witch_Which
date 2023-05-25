from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('<str:username>/follow/', views.follow),
    path('', views.user_list)
]
