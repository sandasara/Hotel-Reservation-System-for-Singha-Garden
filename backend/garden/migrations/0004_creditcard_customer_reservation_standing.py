# Generated by Django 4.2.2 on 2023-07-25 11:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('garden', '0003_creditcard'),
    ]

    operations = [
        migrations.AddField(
            model_name='creditcard',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='garden.customer'),
        ),
        migrations.AddField(
            model_name='reservation',
            name='standing',
            field=models.BooleanField(default=True, verbose_name='Standing or not'),
        ),
    ]
