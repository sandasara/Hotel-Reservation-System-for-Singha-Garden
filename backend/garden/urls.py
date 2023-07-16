from django.urls import path
from garden import views

urlpatterns = [
    path('reservations/', views.get_reservations_list, name='list-reservations'),
    path('reservations/<str:pk>', views.get_reservation, name='get-reservation'),
    path('reservations/create/', views.create_reservation, name="create-reservation"),
    path('reservations/<str:pk>/update/', views.update_reservation, name='update-reservation'),
    path('rooms/available_rooms/', views.search_rooms, name='search_rooms'),
    # path('api/', include(router.urls)),
]
