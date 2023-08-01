# Generated by Django 4.2.2 on 2023-08-01 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('garden', '0003_reservation_special_info'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('feedback_id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='Customer ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('feedback', models.CharField(max_length=2000)),
            ],
        ),
    ]
