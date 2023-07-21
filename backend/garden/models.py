from django.db import models

# Create your models here.
class Room(models.Model):
    room_id = models.AutoField(auto_created=True,
                               primary_key=True,
                               serialize=False,
                               verbose_name='Room ID')
    room_name = models.CharField(max_length=20, unique=True)
    room_price = models.IntegerField()
    description =  models.CharField(max_length=1000, default='No description')

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
    Updated_on = models.DateTimeField(auto_now=True)
    Reserved_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.reservation_id)


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


class RoomAmenity(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    amenity = models.ForeignKey(Amenities, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('room', 'amenity')
        verbose_name_plural = 'Room Amenity'
