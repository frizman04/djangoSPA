from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import commentSerializer
from api.models import Comment


def index(request) :
    return render(request, "index.html")


class CommentAPIView(APIView):

    def get(self, request):
        print("CommentAPIView get")

        #TODO: add filter
        #response with all comments from database
        comments = Comment.objects.all()
        serializer = commentSerializer(data=comments, many=True)
        serializer.is_valid()
        return Response(serializer.data)

    def post(self, request):
        print("CommentAPIView post")
        print(request.data)

        serializer = commentSerializer(data=request.data)
        if (serializer.is_valid()) :
            serializer.save()

            #response with all comments from database
            comments = Comment.objects.all()
            serializer = commentSerializer(data=comments, many=True)
            serializer.is_valid()
            return Response(serializer.data)
        return Response(status=status.HTTP_402_PAYMENT_REQUIRED) #TODO: change on 400 error after debugin



class FilterAPIView(APIView) :
    def post(self, request):
        print("FilterAPIView post")
        filters = request.data

        my_profile = filters["my_profile"]
        bloger_profile = filters["bloger_profile"]
        mark = filters["mark"]

        comments = Comment.objects.all()
        if (mark.isdigit()) :
            mark = int(mark)
            comments = comments.filter(mark = mark)
        
        if (my_profile != "") :
            comments = comments.filter(my_profile__contains = my_profile)
        
        if (bloger_profile != "") :
            comments = comments.filter(bloger_profile__contains = bloger_profile)

        serializer = commentSerializer(data=comments, many=True)
        serializer.is_valid()
        return Response(serializer.data)