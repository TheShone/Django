from rest_framework import serializers
from .models import Task, User, CommonUser
class UserSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(required=False, allow_null=True) 
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "first_name", "last_name", "birth_date"]
        extra_kwargs = {"password": {"write_only": True}}
    def create(self, validated_data):
        birth_date = validated_data.pop("birth_date", None)
        user = User.objects.create_user(**validated_data)
        if birth_date:
            CommonUser.objects.create(user=user, birth_date=birth_date)
        
        return user
    
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields=["id", "title", "description", "status", "created_at", "user"]
        extra_kwargs = {"user": {"read_only":True}}