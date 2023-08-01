from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver
# from .managers import CustomUserManager
from django.contrib.auth import get_user_model

# Create your models here.

# Authentication and autherization

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        CUSTOMER = "CUSTOMER", "Registered_Customer"
        RECEPTIONIST = "RECEPTIONIST", "Receptionist"

    # base_role = Role.ADMIN

    role = models.CharField(max_length=50, choices=Role.choices)
    phone = models.CharField(max_length=12)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)

    objects = UserManager()

    # def save(self, *args, **kwargs):
    #     if not self.pk:
    #         self.role = self.base_role
    #         return super().save(*args, **kwargs)


# class RegisteredCustomerManager(BaseUserManager):
#     def get_queryset(self, *args, **kwargs):
#         results = super().get_queryset(*args, **kwargs)
#         return results.filter(role=User.Role.CUSTOMER)


# class RegisteredCustomer(User):

#     base_role = User.Role.CUSTOMER

#     RegisteredCustomer = RegisteredCustomerManager()

#     class Meta:
#         proxy = True

#     def welcome(self):
#         return "Only for Customers"

# # pylint: disable=E1101
# @receiver(post_save, sender=RegisteredCustomer)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created and instance.role == "CUSTOMER":
#         RegisteredCustomerProfile.objects.create(user=instance)


# class RegisteredCustomerProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     Customer_id = models.IntegerField(null=True, blank=True)


# class ReceptionistManager(BaseUserManager):
#     def get_queryset(self, *args, **kwargs):
#         results = super().get_queryset(*args, **kwargs)
#         return results.filter(role=User.Role.RECEPTIONIST)


# class Receptionist(User):

#     base_role = User.Role.RECEPTIONIST

#     teacher = ReceptionistManager()

#     class Meta:
#         proxy = True

#     def welcome(self):
#         return "Only for teachers"


# class ReceptionistProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     receptionist_id = models.IntegerField(null=True, blank=True)

# # pylint: disable=E0102
# @receiver(post_save, sender=Receptionist)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created and instance.role == "RECEPTIONIST":
#         ReceptionistProfile.objects.create(user=instance)

# -----------------------------------------------------------------------------------------------------------------        

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
    room = models.ForeignKey(Room, null=True, on_delete=models.SET_DEFAULT, default=None)
    customer = models.ForeignKey(Customer, null=True, on_delete=models.SET_DEFAULT, default=None)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_DEFAULT, default=None)
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.IntegerField()
    children = models.IntegerField()
    standing = models.BooleanField(default=True, verbose_name='Standing or not')
    payment_method = models.CharField(max_length=10)
    special_info = models.CharField(max_length=1000, null=True, default=None)
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
    
    # pylint: disable=E1101
    def __str__(self):
        return f"{self.room.room_name} - {self.amenity.amenity_name}"
    
class Feedback(models.Model):
    feedback_id = models.AutoField(auto_created=True,
                                   primary_key=True,
                                   serialize=False,
                                   verbose_name='Customer ID')
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    feedback = models.CharField(max_length=2000)

    def __str__(self):
        return str(self.feedback_id)

#----------------------------------------------------------------------------------------------------------



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