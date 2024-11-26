# Generated by Django 5.1.3 on 2024-12-02 21:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Locations',
            fields=[
                ('location_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('latitude', models.DecimalField(decimal_places=8, max_digits=10, null=True)),
                ('longitude', models.DecimalField(decimal_places=8, max_digits=11, null=True)),
                ('location_image', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='People',
            fields=[
                ('person_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('birth_year', models.DateField(null=True)),
                ('death_year', models.DateField(null=True)),
                ('description', models.TextField(null=True)),
                ('people_image', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Events',
            fields=[
                ('event_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(null=True)),
                ('date', models.DateField(null=True)),
                ('event_image', models.CharField(max_length=255, null=True)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.locations')),
            ],
        ),
        migrations.CreateModel(
            name='Relationships',
            fields=[
                ('relationship_id', models.AutoField(primary_key=True, serialize=False)),
                ('role', models.CharField(max_length=100)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.events')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.people')),
            ],
        ),
    ]