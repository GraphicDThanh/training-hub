from django.urls import path
from core import views as core_views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', core_views.index_view, name='index'),
    path('home/', core_views.home_view, name='home'),
    path('signup/', core_views.signup_view, name='signup'),
    path(
        'login/',
        auth_views.LoginView.as_view(
            template_name='core/login.html',
            redirect_authenticated_user=True
        ),
        name='login'),
    path(
        'logout/',
        auth_views.LogoutView.as_view(
            template_name='core/logout.html'
        ),
        name='logout'),
]
