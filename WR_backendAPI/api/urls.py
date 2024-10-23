from django.urls import path
from .views import get_data, obtener_grafico  # Ya estás importando obtener_grafico directamente
# from .views import RadarDataListView
from .views import filter_json_files
from django.conf import settings
from django.conf.urls.static import static
from .views import obtener_json

urlpatterns = [
    path('data/', get_data, name='get_data'),
    path('grafico/', obtener_grafico, name='obtener_grafico'),  # Remueve "views."
    # path('radar-data/', RadarDataListView.as_view(), name='radar-data-list'),
    path('filter-json/', filter_json_files, name='filter_json_files'),
    path('obtener-json/<str:fecha>/<str:variable>/<str:resolucion>/', obtener_json, name='obtener_json'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


