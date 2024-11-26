from rest_framework import serializers
from .models import People, Locations, Events, Relationships

class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = '__all__'

class LocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locations
        fields = '__all__'

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'

class RelationshipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationships
        fields = '__all__'