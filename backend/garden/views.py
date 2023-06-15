# from django.shortcuts import render
# from rest_framework import viewsets
# from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ReservationSerializer
from .models import Reservation
# from .utils import updateReservation, getReservationDetail, deleteReservation, getReservationsList, createReservation

# Create your views here.

# pylint: disable=E1101
# class ReservationView(viewsets.ModelViewSet):
#     queryset = Reservation.objects.all()
#     serializer_class = ReservationSerializer
    
# # pylint: disable=E1101
# class JustView(APIView):
#     def get(self, request):
#         return Response("just")

# pylint: disable=E1101
@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


# /notes GET
# /notes POST
# /notes/<id> GET
# /notes/<id> PUT
# /notes/<id> DELETE

# pylint: disable=E1101
@api_view(['GET'])
def getReservationsList(request):
    Reservations = Reservation.objects.all()
    serializer = ReservationSerializer(Reservations, many=True)
    return Response(serializer.data)

# pylint: disable=E1101
@api_view(['GET'])
def getReservationDetail(request, pk):
    Reservations = Reservation.objects.get(reservation_id=pk)
    serializer = ReservationSerializer(Reservations, many=False)
    return Response(serializer.data)

# @api_view(['GET', 'POST'])
# def getReservationsList(request):

#     if request.method == 'GET':
#         return getReservationsList(request)

#     if request.method == 'POST':
#         return createReservation(request)


# @api_view(['GET', 'PUT', 'DELETE'])
# def getReservationsList(request, pk):

#     if request.method == 'GET':
#         return getReservationDetail(request, pk)

#     if request.method == 'PUT':
#         return updateReservation(request, pk)

#     if request.method == 'DELETE':
#         return deleteReservation(request, pk)