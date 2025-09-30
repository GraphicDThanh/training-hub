from django.urls import path, include
from . import views
from rest_framework import routers
router = routers.DefaultRouter()
router.register('languages', views.LanguageView)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', views.ListAPI.as_view()),
    path('api-auth/', include('rest_framework.urls'))
]
