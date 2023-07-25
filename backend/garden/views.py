from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.db.models import Prefetch
from .serializers import *
from .models import *
import json

@api_view(['POST'])
def create_reservation(request):
    """
    Create a reservations
    """
    serializer = ReservationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def create_customer(request):
    """
    Create a customer
    """
    serializer = CustomerSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

# pylint: disable=E1101
@csrf_exempt
def search_rooms(request):
    """
    Gets room search parametersfrom frontend and query to find the available rooms.
    Then return available rooms.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            check_in = data.get('checkIn')
            check_out = data.get('checkOut')
            adults = data.get('adults')
            children = data.get('children')

            if not all([check_in, check_out, adults, children]):
                return JsonResponse({'error': 'Missing required parameters'})

            # Query available rooms based on user inputs and reservations
            reservations = Reservation.objects.filter(
                Q(check_in__lte=check_in, check_out__gt=check_in) |
                Q(check_in__lt=check_out, check_out__gte=check_out) |
                Q(check_in__gte=check_in, check_out__lte=check_out)
            )

            reserved_room_ids = reservations.values_list('room_id', flat=True)

            available_rooms = Room.objects.exclude(room_id__in=reserved_room_ids).prefetch_related(
                Prefetch('amenities', queryset=Amenities.objects.all(), to_attr='room_amenities')
            )

            amenities = RoomAmenity.objects.filter(room_id__in=reserved_room_ids)

            # Serialize room objects into JSON
            room_data = []
            for room in available_rooms:
                amenity_names = room.amenities.values_list('amenity_name', flat=True)
                room_data.append({
                    'room_id': room.room_id,
                    'room_name': room.room_name,
                    'room_price': room.room_price,
                    'description': room.description,
                    'amenities': list(amenity_names),
                })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'})

    return JsonResponse({'rooms': room_data})
