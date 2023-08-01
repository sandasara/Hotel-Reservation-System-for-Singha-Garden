from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import *
from garden import views

urlpatterns = [
    # path('reservations/', views.get_reservations_list, name='list-reservations'),
    # path('reservations/<str:pk>', views.get_reservation, name='get-reservation'),
    path('reservations/create/', views.create_reservation, name="create-reservation"),
    path('reservations/create_user_reservation/', views.create_user_reservation, name="create-reservation"),
    path('reservations/create_customer_reservation/', views.create_customer_reservation, name="create-reservation"),
    # path('reservations/<str:pk>/update/', views.update_reservation, name='update-reservation'),
    path('rooms/available_rooms/', views.search_rooms, name='search_rooms'),
    path('rooms/', RoomListView.as_view(), name='room-list'),
    path('create_customer/', views.create_customer, name='create_customer'),
    path('register/', views.user_registration, name='user-registration'),
    # path('login/', views.user_login, name='user-login'),
    # path('login/', UserLoginView.as_view(), name='login'),
    # path('api/', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('get_user/', views.get_user_data, name='get_user_data'),
    path('get_user_profile/', views.get_user_profile, name='get_user_data'),
    path('get_customer_reservations/', views.get_customer_reservations, name='get_customer_reservations'),

]
