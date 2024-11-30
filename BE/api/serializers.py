from rest_framework import serializers
from .models import People, Events, Relationships, Locations

class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = ['person_id', 'name', 'description', 'people_image']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = ['event_id', 'title', 'date', 'description', 'event_image']

class EventDetailSerializer(serializers.ModelSerializer):
    location_name = serializers.CharField(source='location.name')
    latitude = serializers.DecimalField(source='location.latitude', max_digits=9, decimal_places=6)
    longitude = serializers.DecimalField(source='location.longitude', max_digits=9, decimal_places=6)

    class Meta:
        model = Events
        fields = ['event_id', 'title', 'date', 'description', 'location_name', 'latitude', 'longitude', 'event_image']

class SearchEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = ['event_id', 'title', 'description', 'date']
        
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locations
        fields = ['location_id', 'name', 'latitude', 'longitude', 'location_image']
