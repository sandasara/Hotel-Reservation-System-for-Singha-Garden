from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import JsonResponse

from rest_framework import status
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated

from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.db.models import Q
from django.db.models import Prefetch

from datetime import datetime
from .serializers import *
from .models import *
import json

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    print(request)
    # Assuming you have the necessary fields in the User model to display in the profile.
    customer_details = {
        'user_id' : user.id,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'phone': user.phone,
        'address': user.address,
        'city': user.city,
        'state': user.state,
        'country': user.country,
        'zip_code': user.zip_code,

        # Add other fields here.
    }
    return Response(customer_details)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    user = request.user
    print(request)
    print(request.user)
    data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        # Add other user fields you want to include in the response
    }
    return Response(data)

# pylint: disable=E1101
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_customer_reservations(request):
    user_id = request.user.id  # Get the ID of the logged-in user
    reservations = Reservation.objects.filter(customer_id=user_id)  # Filter reservations based on user ID
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data)


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
def create_user_reservation(request):
    """
    Create a reservations
    """
    serializer = UserReservationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def create_customer_reservation(request):
    """
    Create a reservations
    """
    serializer = CustomerReservationSerializer(data=request.data)

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
class RoomListView(ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

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
            
            check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
            check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()

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

            # Serialize room objects into JSON
            room_data = []
            for room in available_rooms:

                amenity_names = room.amenities.values_list('amenity_name', flat=True)
                price_per_day = room.room_price
                number_of_days = (check_out_date - check_in_date).days
                total_price = price_per_day * number_of_days
                room_image_url = room.room_image.url if room.room_image else None

                room_data.append({
                    'room_id': room.room_id,
                    'room_name': room.room_name,
                    'room_image': room_image_url,
                    'room_price': room.room_price,
                    'number_of_days': number_of_days,
                    'total_price': total_price,
                    'description': room.description,
                    'amenities': list(amenity_names),
                })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'})

    return JsonResponse({'rooms': room_data})



# -------------------------------------------------------------------------------------------------------------------
# Authentication and authorization

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['role'] = user.role
        token['email'] = user.email
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def user_registration(request):
    serializer = UserSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return Response({'access_token': access_token}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserRegistrationView(APIView):
#     def post(self, request):
#         serializer = CustomUserSerializer(data=request.data)
#         if serializer.is_valid():
#             user_type = serializer.validated_data.get('user_type')
#             if user_type == 'manager':
#                 if not request.user.is_superuser:
#                     return Response({'error': 'Only superuser can create Manager users'}, status=status.HTTP_403_FORBIDDEN)
#             elif user_type == 'receptionist':
#                 # Add any specific checks for creating receptionist users
#                 pass
#             elif user_type == 'customer':
#                 # Add any specific checks for creating customer users
#                 pass

#             user = serializer.save()
#             token, _ = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def user_registration(request):
#     serializer = UserRegistrationSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# login view attempt 1
# @api_view(['POST'])
# def user_login(request):
#     serializer = UserLoginSerializer(data=request.data)
#     if serializer.is_valid():
#         user = authenticate(
#             email=serializer.validated_data['email'],
#             password=serializer.validated_data['password']
#         )
#         if user:
#             # Create or retrieve the token for the user
#             token, _ = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key, 'user_type': user.user_type})
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# login view attempt 2
# @api_view(['POST'])
# def user_login(request):
#     serializer = UserLoginSerializer(data=request.data)
#     if serializer.is_valid():
#         email = serializer.validated_data['email']
#         password = serializer.validated_data['password']

#         # Manually authenticate the user using CustomUserManager
#         user = CustomUser.objects.authenticate_user(email=email, password=password)

#         if user:
#             # Create or retrieve the token for the user
#             token, _ = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key, 'user_type': user.user_type})
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#login view atttempt 3
# @api_view(['POST'])
# def user_login(request):
#     serializer = UserLoginSerializer(data=request.data)
#     if serializer.is_valid():
#         email = serializer.validated_data['email']
#         password = serializer.validated_data['password']

#         user = authenticate(email=email, password=password)

#         if user:
#             token, _ = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key, 'user_type': user.user_type})
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)