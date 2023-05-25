# 5/20 서영

## Movie와 Genre 모델 MTM으로 데이터 저장 [완료]

Movie 테이블, Genre 테이블, Movie와 Genre테이블의 MTM 필드 테이블 모두에 데이터가 잘 저장된다...

### 새로알게된 것

```
@api_view(['POST', 'DELETE'])
def movie_list(request):
    if request.method == 'DELETE':
        Movie.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'POST':
        movie_id = request.data.get('id')
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            movie = serializer.save(id=movie_id)
            for genre_id in request.data.get('genre_ids', []):
                movie.genres.add(genre_id)
            serializer = MovieSerializer(movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
```

#### 데이터 primary key로 저장하기

```
movie_id = request.data.get('id')
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            movie = serializer.save(id=movie_id)
```

이런식으로 movie 테이블의 primary key로 저장할 데이터를 movie_id로 저장 후 serializer라는 변수에 request.data를 MovieSerializer에 넣은 데이터를 저장한다.

그 후 유효성 검사를 거치고 movie라는 변수에 serializer를 저장할 때 save 함수 안에 id=movie_id를 작성하면 movie_id가 Movie 모델의 primary key로 저장된다!

#### Movie와 Genre의 MTM 필드 데이터 저장하기

```
for genre_id in request.data.get('genre_ids', []):
                movie.genres.add(genre_id)
            serializer = MovieSerializer(movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
```

request.data에 담긴 genre_ids 배열을 반복문으로 돌려 movie(serializer.save(id=movie_id))의 genres 필드에 하나씩 추가한다.

반복문이 끝난 후 movie을 MovieSerializer로 한번 더 serializing해주고 해당 값을 리턴하면 된다!!
