from rest_framework import serializers
from .models import Task, User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=["id","username","password", "email", "first_name", "last_name", "image", "birth_date"]
        extra_kwargs = {"password" : {"write_only":True}}
    def create(self, validated_data):
        user= User.objects.create_user(**validated_data)
        return user
    
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields=["id", "title", "description", "status", "created_at", "user"]
        extra_kwargs = {"user": {"read_only":True}}