from django.urls import path
from .views import get_data, obtener_grafico  # Ya estás importando obtener_grafico directamente
# from .views import RadarDataListView
from .views import filter_json_files

urlpatterns = [
    path('data/', get_data, name='get_data'),
    path('grafico/', obtener_grafico, name='obtener_grafico'),  # Remueve "views."
    # path('radar-data/', RadarDataListView.as_view(), name='radar-data-list'),
    path('filter-json/', filter_json_files, name='filter_json_files'),

]
