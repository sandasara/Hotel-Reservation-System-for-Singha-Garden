from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from .serializers import *
from .models import *
import json
# from .utils import update_reservation,
#                    get_reservation,
#                    deleteReservation,
#                    get_reservations_list,
#                    create_reservation

# pylint: disable=E1101
@api_view(['GET'])
def get_reservations_list(request):
    """
    Get all reservations
    """
    reservations = Reservation.objects.all()
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data)

# pylint: disable=E1101
@api_view(['GET'])
def get_reservation(request, pk):
    """
    Get a single reservations
    """
    reservations = Reservation.objects.get(reservation_id=pk)
    serializer = ReservationSerializer(reservations, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def create_reservation(request):
    """
    Create a reservations
    """
    data = request.data
    reservation = Reservation.objects.create(
        reservation_id = data['reservation_id']
    )
    serializer = ReservationSerializer(reservation, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def update_reservation(request, pk):
    """
    Update a reservations
    """
    data = request.data
    reservation = Reservation.objects.get(reservation_id=pk)
    serializer = ReservationSerializer(instance=reservation, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# @api_view(['GET', 'POST'])
# def get_reservations_list(request):

#     if request.method == 'GET':
#         return get_reservations_list(request)

#     if request.method == 'POST':
#         return create_reservation(request)


# @api_view(['GET', 'PUT', 'DELETE'])
# def get_reservations_list(request, pk):

#     if request.method == 'GET':
#         return get_reservation(request, pk)

#     if request.method == 'PUT':
#         return update_reservation(request, pk)

#     if request.method == 'DELETE':
#         return deleteReservation(request, pk)

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

            available_rooms = Room.objects.exclude(room_id__in=reserved_room_ids)

            amenities = RoomAmenity.objects.filter(room_id__in=reserved_room_ids)

            # Serialize room objects into JSON
            room_data = []
            for room in available_rooms:
                room_data.append({
                    'room_id': room.room_id,
                    'room_name': room.room_name,
                    'room_price': room.room_price,
                    'description': room.description,
                })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'})

    return JsonResponse({'rooms': room_data})
