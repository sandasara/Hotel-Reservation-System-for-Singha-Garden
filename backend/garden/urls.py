from django.urls import path
from garden import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('reservations/', views.getReservationsList, name='list-reservations'),
    path('reservations/<str:pk>', views.getReservationDetail, name='get-reservation'),
    path('reservations/create/', views.createReservation, name="create-reservation"),
    path('reservations/<str:pk>/update/', views.updateReservation, name="update-reservation"),
    # path('api/', include(router.urls)),
]
