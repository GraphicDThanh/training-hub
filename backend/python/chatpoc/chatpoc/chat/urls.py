from django.urls import path
from chat import views


urlpatterns = [
    path('', views.index, name='roomchat'),
    path('<slug:room_name>/', views.room, name='room'),
]
