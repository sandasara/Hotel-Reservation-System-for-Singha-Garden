from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

# User = get_user_model()

# class UserRegistrationSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email', 'password', 'user_type')

# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField(write_only=True)

#     class meta:
#         model = User
#         fields = ('email', 'password')

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ('username', 'password', 'user_type', 'is_active', 'is_staff', 'email')
#         extra_kwargs = {'password': {'write_only': True}}
    
#     def create(self, validated_data):
#         user = CustomUser(email=validated_data['email'], user_type=validated_data['user_type'])
#         user.set_password(validated_data['password'])
#         user.save()
#         return user
