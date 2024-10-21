# api/serializers.py
from rest_framework import serializers
from .models import RadarData

class RadarDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadarData
        fields = '__all__'
