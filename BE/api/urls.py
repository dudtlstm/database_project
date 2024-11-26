from rest_framework.routers import DefaultRouter
from .views import PeopleViewSet, LocationsViewSet, EventsViewSet, RelationshipsViewSet

router = DefaultRouter()
router.register(r'people', PeopleViewSet)
router.register(r'locations', LocationsViewSet)
router.register(r'events', EventsViewSet)
router.register(r'relationships', RelationshipsViewSet)

urlpatterns = router.urls