from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, PutUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import GetUserView
urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/user/get/", GetUserView.as_view(), name="get-user"),
    path("api/user/put/", PutUserView.as_view(), name="put-user"),
    path("api/login/", TokenObtainPairView.as_view(), name="login"),
    path("api/token/refresh/", TokenRefreshView.as_view(),name="refresh"),
    path("api-auth/",include("rest_framework.urls")),
    path("api/", include("api.urls"))
]
