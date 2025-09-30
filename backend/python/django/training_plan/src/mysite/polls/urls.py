from django.urls import path
from django.http import HttpResponse
from django.core.exceptions import PermissionDenied
from django.test import SimpleTestCase, override_settings
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('detail/<int:poll_id>', views.detail, name='detail'),
    path('error/<int:error_id>', views.error, name='error'),
]

handler403 = 'mysite.polls.views.handler403'
