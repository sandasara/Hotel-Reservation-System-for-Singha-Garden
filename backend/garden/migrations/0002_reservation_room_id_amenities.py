# Generated by Django 4.2.2 on 2023-07-10 12:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('garden', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='room_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.PROTECT, to='garden.room'),
        ),
        migrations.CreateModel(
            name='Amenities',
            fields=[
                ('amenity_id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='Amenity ID')),
                ('amenity', models.CharField(max_length=100)),
                ('room_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='garden.room')),
            ],
        ),
    ]
