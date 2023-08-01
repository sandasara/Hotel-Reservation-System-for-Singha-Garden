from django.contrib import admin
# Register your models here.
from .models import *

class RoomAmenityInline(admin.TabularInline):
    model = RoomAmenity

class RoomAdmin(admin.ModelAdmin):
    list_display = ['room_id', 'room_name', 'room_price', 'description', 'get_amenities']
    inlines = [RoomAmenityInline]

    def get_amenities(self, obj):
        return ", ".join([amenity.amenity_name for amenity in obj.amenities.all()])

    get_amenities.short_description = 'Amenities'

class CustomerAdmin(admin.ModelAdmin):
    list_display = ['customer_id', 'first_name', 'last_name', 'email', 'phone', 'address', 'city', 'country', 'zip_code']

class ReservationAdmin(admin.ModelAdmin):
    list_display = ['reservation_id', 'room', 'customer', 'user', 'check_in', 'check_out', 'adults', 'children','standing', 'Updated_on', 'Reserved_on']

class AmenitiesAdmin(admin.ModelAdmin):
    list_display = ['amenity_id', 'amenity_name']

# admin.site.register(CustomUser)
admin.site.register(Room, RoomAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(Amenities, AmenitiesAdmin)
admin.site.register(User)


