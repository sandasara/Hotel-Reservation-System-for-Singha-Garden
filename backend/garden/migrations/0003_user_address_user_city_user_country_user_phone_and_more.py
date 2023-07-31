# Generated by Django 4.2.2 on 2023-07-31 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('garden', '0002_remove_receptionistprofile_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='address',
            field=models.CharField(default='default address', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='city',
            field=models.CharField(default='default city', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='country',
            field=models.CharField(default='default country', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='phone',
            field=models.CharField(default='07xxxxxxxx', max_length=12),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='state',
            field=models.CharField(default='default state', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='zip_code',
            field=models.CharField(default='xxxxxx', max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]