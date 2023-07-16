from django.db import models

# Create your models here.
class Room(models.Model):
    room_id = models.AutoField(auto_created=True,
                               primary_key=True,
                               serialize=False,
                               verbose_name='Room ID')
    room_name = models.CharField(max_length=20, unique=True)
    room_price = models.IntegerField()

    def __str__(self):
        return str(self.room_name)
    
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

    def __str__(self):
        return str(self.customer_id)


class Reservation(models.Model):
    reservation_id = models.AutoField(auto_created=True,
                                      primary_key=True,
                                      serialize=False,
                                      verbose_name='Reservation ID')
    room_id = models.ForeignKey(Room, null=True, on_delete=models.SET_NULL)
    customer_id = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL)
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.IntegerField()
    children = models.IntegerField()

    def __str__(self):
        return str(self.reservation_id)


class Amenities(models.Model):
    amenity_id = models.AutoField(auto_created=True,
                               primary_key=True,
                               serialize=False,
                               verbose_name='Amenity ID')
    amenity = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'amenities'

    def __str__(self):
        return str(self.amenity)


class RoomAmenity(models.Model):
    room_id = models.OneToOneField(Room, on_delete=models.CASCADE, primary_key=True)
    amenity_id = models.OneToOneField(Amenities, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('room_id', 'amenity_id')
