"""social_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_swagger.views import get_swagger_view

from social_api.user.views import UserViewSet, FriendViewset
from social_api.category.views import CategoryViewSet
from social_api.post.views import PostViewSet, CommentViewSet, LikeViewSet
from social_api.core.views import PhotoViewSet

APP_TITLE = 'Social API'
APP_DESCRIPTION = """A Social API for create user,
    make friends, create post, comment, like"""

schema_view = get_swagger_view(title=APP_TITLE)
router = DefaultRouter()

router.register('users', UserViewSet, base_name='user')
router.register('friends', FriendViewset, base_name='friend')
router.register('categories', CategoryViewSet, base_name='category')
router.register('posts', PostViewSet, base_name='post')
router.register('comments', CommentViewSet, base_name='comment')
router.register('photos', PhotoViewSet, base_name='photo')
router.register('likes', LikeViewSet, base_name='like')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),

    # auth link admin page
    path('api-auth/', include('rest_framework.urls')),
    # auth for rest framework
    path('api/v1/rest-auth/', include('rest_auth.urls')),
    path(
        'api/v1/rest-auth/sign-up/',
        include('rest_auth.registration.urls'),
        name='sign-up'
    ),
    path('swagger-docs/', schema_view)
]
