from django.db import models

# Create your models here.
class Room(models.Model):
    room_id = models.AutoField(auto_created=True, 
                               primary_key=True, 
                               serialize=False, 
                               verbose_name='Room ID')
    room_name = models.CharField(max_length=20, unique=True)
    room_price = models.IntegerField()

class Customer(models.Model):
    customer_id = models.AutoField(auto_created=True, 
                                   primary_key=True, 
                                   serialize=False, 
                                   verbose_name='Customer ID')
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=12)
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=20)
    country = models.CharField(max_length=20)
    zip_code = models.CharField(max_length=20)

class Reservation(models.Model):
    reservation_id = models.AutoField(auto_created=True, 
                                      primary_key=True, 
                                      serialize=False, 
                                      verbose_name='Reservation ID')
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.IntegerField()
    children = models.IntegerField()