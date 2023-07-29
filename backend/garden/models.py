from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver
# from .managers import CustomUserManager
from django.contrib.auth import get_user_model

# Create your models here.

class Amenities(models.Model):
    amenity_id = models.AutoField(auto_created=True,
                               primary_key=True,
                               serialize=False,
                               verbose_name='Amenity ID')
    amenity_name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'amenities'

    def __str__(self):
        return str(self.amenity_name)

class Room(models.Model):
    room_id = models.AutoField(auto_created=True,
                               primary_key=True,
                               serialize=False,
                               verbose_name='Room ID')
    room_name = models.CharField(max_length=50, unique=True)
    room_price = models.IntegerField()
    description =  models.CharField(max_length=1000, default='No description')
    amenities = models.ManyToManyField(Amenities, through='RoomAmenity')
    room_image = models.ImageField(upload_to='garden_room_images/', default='default_room_image_twr44l.jpg')

    def __str__(self):
        return str(self.room_name)

class Customer(models.Model):
    customer_id = models.AutoField(auto_created=True,
                                   primary_key=True,
                                   serialize=False,
                                   verbose_name='Customer ID')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=12)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)

    def __str__(self):
        return str(self.customer_id)


class Reservation(models.Model):
    reservation_id = models.AutoField(auto_created=True,
                                      primary_key=True,
                                      serialize=False,
                                      verbose_name='Reservation ID')
    room = models.ForeignKey(Room, null=True, on_delete=models.SET_DEFAULT, default="0")
    customer = models.ForeignKey(Customer, null=True, on_delete=models.SET_DEFAULT, default="0")
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.IntegerField()
    children = models.IntegerField()
    standing = models.BooleanField(default=True, verbose_name='Standing or not')
    payment_method = models.CharField(max_length=10)
    Updated_on = models.DateTimeField(auto_now=True)
    Reserved_on = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Check if the check_out date is in the past compared to the current date
        if self.check_out < timezone.now().date():
            self.standing = False
        else:
            self.standing = True

        super(Reservation, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.reservation_id)


class RoomAmenity(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='room_amenities')
    amenity = models.ForeignKey(Amenities, on_delete=models.CASCADE, related_name='amenity_rooms')

    class Meta:
        unique_together = ('room', 'amenity')
        verbose_name_plural = 'Room Amenity'
    
    def __str__(self):
        return f"{self.room.room_name} - {self.amenity.amenity_name}"

class CreditCard(models.Model):
    cardno = models.CharField(primary_key=True,max_length=16, verbose_name='credit_card')
    customer = models.ForeignKey(Customer, null=True, on_delete=models.CASCADE)
    expmonth = models.CharField(max_length=2)
    expyear = models.CharField(max_length=2)
    cvv = models.CharField(max_length=3)

    def __str__(self):
        return str(self.cardno)


#----------------------------------------------------------------------------------------------------------

# Authentication and autherization

# class CustomUser(AbstractUser):
#     USER_TYPES = (
#         ('manager', 'Manager'),
#         ('receptionist', 'Receptionist'),
#         ('customer', 'Customer'),
#     )
#     user_type = models.CharField(max_length=20, choices=USER_TYPES)
#     email = models.EmailField(max_length=254, unique=True)
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['user_type', 'username']

#     objects = CustomUserManager()