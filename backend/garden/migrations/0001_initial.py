# Generated by Django 4.2.2 on 2023-06-11 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('customer_id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='Customer ID')),
                ('first_name', models.CharField(max_length=20)),
                ('last_name', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=12)),
                ('street', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=20)),
                ('country', models.CharField(max_length=20)),
                ('zip_code', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('reservation_id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='Reservation ID')),
                ('check_in', models.DateField()),
                ('check_out', models.DateField()),
                ('adults', models.IntegerField()),
                ('children', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('room_id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='Room ID')),
                ('room_name', models.CharField(max_length=20, unique=True)),
                ('room_price', models.IntegerField()),
            ],
        ),
    ]
