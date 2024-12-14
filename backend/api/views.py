from django.shortcuts import render
from .models import User,Task, CommonUser
from rest_framework import generics
from .serializer import UserSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response


#Tasks Crud operations

#Put Tasks and Get Tasks per User
class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(user)
        return Task.objects.filter(user=user)
    
    def perform_create(self,serializer):
        print(self)
        print(serializer)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

#Get task per ID
class GetTask(generics.RetrieveAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user=self.request.user
        return Task.objects.filter(user=user)

#Delete Task
class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)
#Put Task
class PutTask(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)
    
#Users Crud operations

#Create User
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class= UserSerializer
    permission_classes = [AllowAny]

#Get User info 
class GetUserView (generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user)
        data = serializer.data
        try:
            common_user = CommonUser.objects.get(user=user)
            data['birth_date'] = common_user.birth_date
        except CommonUser.DoesNotExist:
            data['birth_date'] = None 
        return Response(data)
    
#Put User
class PutUserView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated]
    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)
    