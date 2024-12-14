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
    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        if "password" in validated_data:
            instance.set_password(validated_data["password"])
        instance.save()
        birth_date = validated_data.get("birth_date")
        if birth_date is not None:
            common_user, created = CommonUser.objects.get_or_create(user=instance)
            common_user.birth_date = birth_date
            common_user.save()
        return instance
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields=["id", "title", "description", "status", "created_at", "user"]
        extra_kwargs = {"user": {"read_only": True}}