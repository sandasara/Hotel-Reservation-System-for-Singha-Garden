from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ReservationSerializer
from .models import Reservation

# Create your views here.

# pylint: disable=E1101
class ReservationView(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class JustView(APIView):
    def get(self, request):
        return Response("just")
