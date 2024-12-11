from django.shortcuts import render
from .models import User,Task
from rest_framework import generics
from .serializer import UserSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


#Tasks Crud operations

#Put Tasks and Get Tasks per User
class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)
    
    def create_task(self,serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

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
    
    

#Users Crud operations
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class= UserSerializer
    permission_classes = [AllowAny]
