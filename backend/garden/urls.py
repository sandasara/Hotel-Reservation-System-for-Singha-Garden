from django.urls import path
from garden import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('reservations/', views.getReservationsList, name='reservations'),
    path('reservations/<str:pk>', views.getReservationDetail, name='reservation')
    # path('api/', include(router.urls)),
]
