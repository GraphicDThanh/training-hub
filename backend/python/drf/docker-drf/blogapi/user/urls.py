from rest_framework.routers import SimpleRouter
from .views import UserViewSet

router = SimpleRouter()
router.register('', UserViewSet, base_name='users')

urlpatterns = router.urls
