# Crea un nuevo archivo en tu carpeta scripts, por ejemplo, "import_json_to_db.py"
import os
import json
from datetime import datetime
from api.models import RadarData  # Asegúrate de ajustar la importación según la ubicación del modelo
import django
django.setup()  # Configura Django para usarlo fuera del servidor

# Define el directorio donde están los archivos JSON
input_dir = './api/scripts/json_generados_marzo'

# Itera sobre todos los archivos en el directorio
for archivo in os.listdir(input_dir):
    if archivo.endswith(".json"):
        file_path = os.path.join(input_dir, archivo)
        
        # Extrae información del nombre del archivo
        file_parts = archivo.split('_')
        date_str = file_parts[0]
        data_type = file_parts[1]
        resolution = file_parts[2].split('.')[0]  # Remueve la extensión ".json"
        
        # Convierte la fecha
        date = datetime.strptime(date_str, "%Y%m%d").date()
        
        # Lee el contenido JSON
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        # Guarda los datos en la base de datos
        radar_data = RadarData(date=date, resolution=resolution, data_type=data_type, data=data)
        radar_data.save()
        
        print(f"Datos importados: {archivo}")
