# Generated by Django 4.2.2 on 2023-07-16 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('garden', '0006_alter_reservation_adults_alter_reservation_check_in_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='adults',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='check_in',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='check_out',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='children',
            field=models.IntegerField(),
        ),
    ]
