from django.urls import path, include
from apis import views
from rest_framework import routers
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

APP_NAME = 'apis'

# Register viewset into router
router = routers.DefaultRouter()
router.register(r'rooms', views.RoomViewSet)


# Define API documentation
schema_view = get_schema_view(
   openapi.Info(
      title="Chat Room API Documentation",
      default_version='v1',
      description="Demo chat room using django channels with web socket",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

# Define single views with APIView
urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.signup, name='signup'),
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # API Documentation end-points
    # path('swagger(?<str:format>\.json|\.yaml)', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
