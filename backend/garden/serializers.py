from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

# User = get_user_model()

# class UserRegistrationSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email', 'password', 'role)

# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField(write_only=True)

#     class meta:
#         model = User
#         fields = ('email', 'password')

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role', 'first_name', 'last_name', 'phone', 'address', 'city', 'state', 'zip_code', 'country')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class UserReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['reservation_id', 'room', 'user', 'check_in', 'check_out', 'adults', 'children','standing', 'Updated_on', 'Reserved_on']

class CustomerReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['reservation_id', 'room', 'customer', 'check_in', 'check_out', 'adults', 'children','standing', 'Updated_on', 'Reserved_on']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ReservationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['room','check_in', 'check_out', 'adults', 'children','standing']


class RoomSerializer(serializers.ModelSerializer):
    amenities = serializers.StringRelatedField(many=True)

    class Meta:
        model = Room
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['name', 'email', 'feedback']
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('username', 'password', 'role', 'is_active', 'is_staff', 'email', 'id')
#         extra_kwargs = {'password': {'write_only': True}}
    
#     def create(self, validated_data):
#         user = CustomUser(email=validated_data['email'], user_type=validated_data['user_type'])
#         user.set_password(validated_data['password'])
#         user.save()
#         return user
