from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import People, Events, Relationships, Locations
from .serializers import PeopleSerializer, EventSerializer, EventDetailSerializer, SearchEventSerializer
from django.db.models import Q

class PeopleListView(APIView):
    """
    API for listing all people.
    """
    def get(self, request):
        people = People.objects.all()
        serializer = PeopleSerializer(people, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EventsByPersonView(APIView):
    """
    API for listing events by a person.
    """
    def get(self, request, person_id):
        events = Events.objects.filter(relationships__person_id=person_id).order_by('date')
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SearchEventView(APIView):
    """
    API for searching events by keywords in title or description.
    """
    def get(self, request, person_id):
        query = request.query_params.get('q', '')
        events = Events.objects.filter(
            Q(relationships__person_id=person_id),
            Q(title__icontains=query) | Q(description__icontains=query)
        ).order_by('date')
        serializer = SearchEventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EventDetailView(APIView):
    """
    API for retrieving detailed event information.
    """
    def get(self, request, event_id):
        event = Events.objects.select_related('location').get(event_id=event_id)
        serializer = EventDetailSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SearchAllView(APIView):
    """
    API for searching across People, Events, and Locations.
    """
    def get(self, request):
        query = request.query_params.get('q', '')
        if not query:
            return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

        # People 검색
        people_results = People.objects.filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        )
        # Events 검색
        event_results = Events.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        )
        # Locations 검색
        location_results = Locations.objects.filter(
            Q(name__icontains=query)
        )

        # Serialize 데이터
        people_serializer = PeopleSerializer(people_results, many=True)
        event_serializer = EventSerializer(event_results, many=True)
        location_serializer = LocationSerializer(location_results, many=True)

        return Response({
            "people": people_serializer.data,
            "events": event_serializer.data,
            "locations": location_serializer.data
        }, status=status.HTTP_200_OK)

