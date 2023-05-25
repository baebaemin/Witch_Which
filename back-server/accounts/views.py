from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from .models import User
from django.shortcuts import get_list_or_404
from .serializers import UserSerializer
from rest_framework.response import Response

@api_view(['POST'])
def follow(request, username):
    if request.method == 'POST':
        if request.user.is_authenticated:
            User = get_user_model()
            me = request.user
            you = User.objects.get(username=username)
            if me != you:
                if you.followers.filter(pk=me.pk).exists():
                    you.followers.remove(me)
                    is_followed = False # 이 변수에 팔로우 여부를 저장하고 해당 값을 context로 보냄
                else:
                    you.followers.add(me)
                    is_followed = True
                context = {
                    'is_followed': is_followed,
                    'followers_count': you.followers.count(),
                    'followings_count': you.followings.count(),
                }
                return JsonResponse(context)
            
@api_view(['GET'])           
def user_list(request):
    if request.method == 'GET':
        users = get_list_or_404(User)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    