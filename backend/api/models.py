from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    image= models.TextField(null=True, blank=True)
    birth_date= models.DateField(null=True, blank=True)

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    user= models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self):
        return self.title
