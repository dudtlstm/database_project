from rest_framework import serializers
from .models import People, Events, Relationships

class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = ['id', 'name', 'description', 'people_image']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = ['id', 'title', 'date', 'description', 'event_image']

class EventDetailSerializer(serializers.ModelSerializer):
    location_name = serializers.CharField(source='location.name')
    latitude = serializers.DecimalField(source='location.latitude', max_digits=9, decimal_places=6)
    longitude = serializers.DecimalField(source='location.longitude', max_digits=9, decimal_places=6)

    class Meta:
        model = Events
        fields = ['id', 'title', 'date', 'description', 'location_name', 'latitude', 'longitude']

class SearchEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = ['id', 'title', 'description', 'date']
