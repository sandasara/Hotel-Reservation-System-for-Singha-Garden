from django.db import models
from django.utils import timezone
# from django.contrib.auth.models import AbstractUser, BaseUserManager
# from django.db.models.signals import post_save
# from django.dispatch import receiver

# Create your models here.

class Amenities(models.Model):
    amenity_id = models.AutoField(auto_created=True,
                               primary_key=True,
                               serialize=False,
                               verbose_name='Amenity ID')
    amenity_name = models.CharField(max_length=100)
    amenity_description = models.CharField(max_length=500, default='No description')

    class Meta:
        verbose_name_plural = 'amenities'

    def __str__(self):
        return str(self.amenity_name)

class Room(models.Model):
    room_id = models.AutoField(auto_created=True,
                               primary_key=True,
                               serialize=False,
                               verbose_name='Room ID')
    room_name = models.CharField(max_length=20, unique=True)
    room_price = models.IntegerField()
    description =  models.CharField(max_length=1000, default='No description')
    amenities = models.ManyToManyField(Amenities, through='RoomAmenity')

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

# class User(AbstractUser):
#     class Role(models.TextChoices):
#         ADMIN = "ADMIN", "Admin"
#         CUSTOMER = "CUSTOMER", "Customer"
#         RECEPTIONIST = "RECEPTIONIST", "Receptionist"

#     base_role = Role.OTHER

#     role = models.CharField(max_length=50, choices=Role.choices)

#     def save(self, *args, **kwargs):
#         if not self.pk:
#             self.role = self.base_role
#             return super().save(*args, **kwargs)


# class CustomerManager(BaseUserManager):
#     def get_queryset(self, *args, **kwargs):
#         results = super().get_queryset(*args, **kwargs)
#         return results.filter(role=User.Role.CUSTOMER)


# class CustomerUser(User):

#     base_role = User.Role.CUSTOMER

#     Customer = CustomerManager()

#     class Meta:
#         proxy = True

#     def welcome(self):
#         return "Only for Customers"

# # pylint: disable=E1101
# @receiver(post_save, sender=CustomerUser)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created and instance.role == "CUSTOMER":
#         CustomerProfile.objects.create(user=instance)


# class CustomerProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     Customer_id = models.IntegerField(null=True, blank=True)


# class ReceptionistManager(BaseUserManager):
#     def get_queryset(self, *args, **kwargs):
#         results = super().get_queryset(*args, **kwargs)
#         return results.filter(role=User.Role.Receptionist)


# class ReceptionistUser(User):

#     base_role = User.Role.RECEPTIONIST

#     Receptionist = ReceptionistManager()

#     class Meta:
#         proxy = True

#     def welcome(self):
#         return "Only for Receptionists"


# class ReceptionistProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     Receptionist_id = models.IntegerField(null=True, blank=True)


# @receiver(post_save, sender=ReceptionistUser)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created and instance.role == "RECEPTIONIST":
#         ReceptionistProfile.objects.create(user=instance)