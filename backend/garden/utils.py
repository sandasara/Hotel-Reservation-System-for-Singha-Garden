from rest_framework.response import Response
from .models import Reservation
from .serializers import ReservationSerializer

# pylint: disable=E1101
def getReservationsList(request):
    Reservations = Reservation.objects.all().order_by('-updated')
    serializer = ReservationSerializer(Reservations, many=True)
    return Response(serializer.data)

# pylint: disable=E1101
def getReservationDetail(request, pk):
    Reservations = Reservation.objects.get(id=pk)
    serializer = ReservationSerializer(Reservations, many=False)
    return Response(serializer.data)

# pylint: disable=E1101
# pylint: disable=E0601
def createReservation(request):
    data = request.data
    Reservation = Reservation.objects.create(
        body=data['body']
    )
    serializer = ReservationSerializer(Reservation, many=False)
    return Response(serializer.data)

# pylint: disable=E1101
# pylint: disable=E0601
def updateReservation(request, pk):
    data = request.data
    Reservation = Reservation.objects.get(id=pk)
    serializer = ReservationSerializer(instance=Reservation, data=data)

    if serializer.is_valid():
        serializer.save()

    return serializer.data


def deleteReservation(request, pk):
    Reservation = Reservation.objects.get(id=pk)
    Reservation.delete()
    return Response('Reservation was deleted!')