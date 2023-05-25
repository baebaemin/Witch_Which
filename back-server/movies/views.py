from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from .models import Genre, Movie, QuestionOTO
import requests

from .models import Movie, Review, Comment
from .serializers import (
    ReviewSerializer,
    CommentSerializer,
    CommentListSerializer,
    MovieSerializer, 
    GenreSerializer,
    QuestionOTOSerializer,
)

@api_view(['POST'])
def movie_list(request):
    if request.method == 'POST':
        movie_id = request.data.get('id')
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                movie = serializer.save(id=movie_id)
                for genre_id in request.data.get('genre_ids', []):
                    try:
                        movie.genres.add(genre_id)
                    except:
                        pass  # 오류가 발생하면 무시하고 진행
                serializer = MovieSerializer(movie)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except:
                pass  # 오류가 발생하면 무시하고 진행

    return Response(status=status.HTTP_201_CREATED)  # 처리되지 않은 요청에 대한 응답

@api_view(['GET', 'POST'])
def genre_list(request):
    if request.method == 'POST':
        genre_id = request.data.get('id')
        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save(id=genre_id)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except:
                pass  # 오류가 발생하면 무시하고 진행
        return Response(status=status.HTTP_201_CREATED)  # 처리되지 않은 요청에 대한 응답
    elif request.method == 'GET':
        genres = get_list_or_404(Genre)
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def question_oto_list(request):
    question_oto = get_list_or_404(QuestionOTO)
    serializer  = QuestionOTOSerializer(question_oto, many=True)
    return Response(serializer.data)
        
        
@api_view(['GET', 'POST'])
def review_list(request, movie_id):
    if request.method == 'GET':
        reviews = Review.objects.filter(movie_id=movie_id).order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            movie = get_object_or_404(Movie, pk=movie_id)
            serializer.save(user=request.user, movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)





@api_view(['GET', 'PUT', 'DELETE'])
def review_detail(request, review_id):
    review = get_object_or_404(Review, pk=review_id)
    if request.method == 'GET':
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def comment_list(request, review_id):
    review = get_object_or_404(Review, id=review_id)
    if request.method == 'GET':
        comments = review.comment_set.all()
        serializer = CommentListSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, review=review)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        


@api_view(['PUT', 'DELETE'])
def comment_detail(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    if request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def movie_like(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    user = request.user
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
        is_like = False
    else:
        movie.like_users.add(user)
        is_like = True
    response = { 
        'isLike': is_like, 
        'likeCount': movie.like_users.count() }
    return JsonResponse(response)

@api_view(['POST'])
def user_movie(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    user = request.user
    movie.movie_deque.add(user)
    is_added = True
    response = { 
        'is_added': is_added, 
        'cardCount': movie.movie_deque.count(),
        'movie_id' : movie_id,
        'user_id' : user.id}
    return JsonResponse(response)


@api_view(['POST'])
def profile_cards(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    user = request.user
    if movie.special_cards.filter(pk=user.pk).exists():
        movie.special_cards.remove(user)
        is_uploaded = False
    else:
        movie.special_cards.add(user)
        is_uploaded = True
    response = { 
        'is_uploaded': is_uploaded, 
        'profileCardCount': movie.special_cards.count() }
    return JsonResponse(response)