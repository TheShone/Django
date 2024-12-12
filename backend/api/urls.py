from django.urls import path
from . import views
urlpatterns= [
    path('tasks/', views.TaskListCreate.as_view(), name="task-list"),
    path('tasks/delete/<int:pk>/', views.TaskDelete.as_view(), name="delete-task"),
    path('tasks/getTask/<int:pk>/', views.GetTask.as_view(), name="get-task")
]