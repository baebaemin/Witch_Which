from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.IntegerField(source='followers.count', read_only=True)
    followings_count = serializers.IntegerField(source='followings.count', read_only=True)
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('followings',)