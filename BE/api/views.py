from rest_framework import viewsets
from .models import People, Locations, Events, Relationships
from .serializers import (
    PeopleSerializer,
    LocationsSerializer,
    EventsSerializer,
    RelationshipsSerializer
)

class PeopleViewSet(viewsets.ModelViewSet):
    queryset = People.objects.all()
    serializer_class = PeopleSerializer

class LocationsViewSet(viewsets.ModelViewSet):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer

class EventsViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = EventsSerializer

class RelationshipsViewSet(viewsets.ModelViewSet):
    queryset = Relationships.objects.all()
    serializer_class = RelationshipsSerializer