from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse

import json
from django.conf import settings
from pathlib import Path

# views.py
import os
import json
from django.http import JsonResponse
from django.conf import settings

# Create your views here.

@api_view(['GET'])
def get_data(request):
    return Response({'message': 'Hola desde la API de Django!'})

def obtener_grafico(request):
    # Cargar el archivo JSON
    json_file = Path(settings.BASE_DIR) / 'api' / 'source' / 'imagenes_generadas' / 'imagen_interactiva.json'
    with open(json_file, 'r') as f:
        data = json.load(f)

    return JsonResponse(data)


# # api/views.py
# from rest_framework import generics
# from .models import RadarData
# from .serializers import RadarDataSerializer
# from rest_framework.filters import OrderingFilter
# from django_filters.rest_framework import DjangoFilterBackend

# class RadarDataListView(generics.ListAPIView):
#     queryset = RadarData.objects.all()
#     serializer_class = RadarDataSerializer
#     filter_backends = [DjangoFilterBackend, OrderingFilter]
#     filterset_fields = ['date', 'data_type', 'resolution']  # Permite filtrar por fecha, tipo y resolución
#     ordering_fields = ['date']


# def filter_json_files(request):
#     # Obtener los parámetros de consulta
#     date = request.GET.get('date')         # Formato YYYYMMDD
#     variable = request.GET.get('variable') # Ej. 'dbz', 'fall_velocity'
#     resolution = request.GET.get('resolution') # Ej. '100m' o '250m'

#     json_dir = os.path.join(settings.BASE_DIR, 'api', 'scripts', 'json_generados_marzo')
#     filtered_files = []

#     for filename in os.listdir(json_dir):
#         if date in filename and variable in filename and resolution in filename:
#             with open(os.path.join(json_dir, filename), 'r') as f:
#                 data = json.load(f)
#                 filtered_files.append({
#                     'filename': filename,
#                     'data': data
#                 })

#     return JsonResponse(filtered_files, safe=False)

def filter_json_files(request):
    # Obtener los parámetros de consulta
    date = request.GET.get('date')         # Formato YYYYMMDD
    variable = request.GET.get('variable') # Ej. 'dbz', 'fall_velocity'
    resolution = request.GET.get('resolution') # Ej. '100m' o '250m'

    print(f"Buscando archivos con: {date}, {variable}, {resolution}")

    json_dir = os.path.join(settings.BASE_DIR, 'api', 'scripts', 'json_generados_marzo')
    filtered_files = []

    for filename in os.listdir(json_dir):
        if date in filename and variable in filename and resolution in filename:
            with open(os.path.join(json_dir, filename), 'r') as f:
                data = json.load(f)
                filtered_files.append({
                    'filename': filename,
                    'data': data
                })

    if not filtered_files:
        print("No se encontraron archivos para los parámetros dados.")
    
    return JsonResponse(filtered_files, safe=False)

# from django.http import JsonResponse
# import os
# import json

# def obtener_json(request, fecha, variable, resolucion):
#     # Construir la ruta al archivo JSON basado en los parámetros
#     archivo_json = f'media/json_file/202408/{fecha}_{variable}_{resolucion}.json'
    
#     # Verificar si el archivo existe
#     if os.path.exists(archivo_json):
#         with open(archivo_json, 'r') as json_file:
#             data = json.load(json_file)
#         return JsonResponse(data)
#     else:
#         return JsonResponse({"error": "Archivo no encontrado"}, status=404)
from django.http import JsonResponse
import os
import json
from django.conf import settings

def obtener_json(request, fecha, variable, resolucion):
    # Construir la ruta completa usando settings.MEDIA_ROOT
    archivo_json = os.path.join(settings.MEDIA_ROOT, f'json_file/202408/{fecha}_{variable}_{resolucion}.json')
    
    # Verificar si el archivo existe
    if os.path.exists(archivo_json):
        with open(archivo_json, 'r') as json_file:
            data = json.load(json_file)
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "Archivo no encontrado"}, status=404)
 