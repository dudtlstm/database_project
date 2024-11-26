from django.db import models

class People(models.Model):
    person_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, null=False)
    birth_year = models.DateField(null=True)
    death_year = models.DateField(null=True)
    description = models.TextField(null=True)
    people_image = models.CharField(max_length=255, null=True)

class Locations(models.Model):
    location_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, null=False)
    latitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    longitude = models.DecimalField(max_digits=11, decimal_places=8, null=True)
    location_image = models.CharField(max_length=255, null=True)

class Events(models.Model):
    event_id = models.AutoField(primary_key=True)
    location = models.ForeignKey(Locations, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True)
    date = models.DateField(null=True)
    event_image = models.CharField(max_length=255, null=True)

class Relationships(models.Model):
    relationship_id = models.AutoField(primary_key=True)
    person = models.ForeignKey(People, on_delete=models.CASCADE)
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    role = models.CharField(max_length=100, null=False)