from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import PostViewSet

router = SimpleRouter()
router.register('', PostViewSet, base_name='posts')

urlpatterns = router.urls
