from django.db import models
from django.conf import settings

class Genre(models.Model):
    name = models.CharField(max_length=50)

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField(null=True)
    popularity = models.FloatField()
    vote_average = models.FloatField()
    overview = models.TextField(blank=True)
    poster_path = models.CharField(max_length=200, null=True)
    genres = models.ManyToManyField(Genre)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies')
    movie_deque = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='user_movies')
    special_cards = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='favorite_movies')

class QuestionAPI(models.Model):
    question = models.TextField(null=True)
    left = models.CharField(max_length=50, null=True)
    right = models.CharField(max_length=50, null=True)
    left_answer = models.TextField(null=True)
    right_answer = models.TextField(null=True)

class QuestionOTO(models.Model):
    type = models.IntegerField(null=True)
    question = models.TextField(null=True)
    leftAnswer = models.TextField(null=True)
    rightAnstwer = models.TextField(null=True)
    leftMovieId = models.IntegerField(null=True)
    rightMovieId = models.IntegerField(null=True)
    leftMovieName = models.TextField(null=True)
    rightMovieName = models.TextField(null=True)

# Create your models here.
class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    content = models.TextField()
    stars = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)