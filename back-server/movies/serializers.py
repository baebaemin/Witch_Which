from rest_framework import serializers
from .models import Review, Comment, Movie, Genre, QuestionOTO
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class QuestionOTOSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOTO
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(read_only=True, many=True)
    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = ('genres', 'like_users')
        

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    movie = MovieSerializer(read_only=True)
    updated_at = serializers.SerializerMethodField()
    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%Y-%m-%d %H:%M:%S')
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user', 'movie')

# class ReviewListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    review = ReviewSerializer(read_only=True)
    updated_at = serializers.SerializerMethodField()
    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%Y-%m-%d %H:%M:%S')
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'review')

class CommentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'created_at')