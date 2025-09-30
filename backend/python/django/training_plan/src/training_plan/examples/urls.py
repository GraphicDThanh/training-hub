from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('current', views.current_datetime, name='current-datetime'),
    path('test/<int:foo>', views.my_view, name='test-my-view'),
]
