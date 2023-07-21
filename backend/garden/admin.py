from django.contrib import admin

# Register your models here.
from .models import *

class RoomAdmin(admin.ModelAdmin):
    list_display = ['room_id', 'room_name', 'room_price', 'description']

class CustomerAdmin(admin.ModelAdmin):
    list_display = ['customer_id', 'first_name', 'last_name', 'email', 'phone', 'address', 'city', 'country', 'zip_code']

class ReservationAdmin(admin.ModelAdmin):
    list_display = ['reservation_id', 'room', 'customer', 'check_in', 'check_out', 'adults', 'children', 'Updated_on', 'Reserved_on']

class AmenitiesAdmin(admin.ModelAdmin):
    list_display = ['amenity_id', 'amenity_name', 'amenity_description']

class RoomAmenityAdmin(admin.ModelAdmin):
    list_display = ['room', 'amenity']

admin.site.register(Room, RoomAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(Amenities, AmenitiesAdmin)
admin.site.register(RoomAmenity, RoomAmenityAdmin)



