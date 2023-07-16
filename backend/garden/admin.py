from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Room)
admin.site.register(Customer)
admin.site.register(Reservation)
admin.site.register(Amenities)
