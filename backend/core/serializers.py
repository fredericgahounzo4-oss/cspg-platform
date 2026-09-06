from rest_framework import serializers
from .models import Serie, Actualite, Activite, Photo, Inscription, ContactMessage


class SerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Serie
        fields = ["id", "code", "nom", "cycle", "description", "ordre"]


class ActualiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actualite
        fields = ["id", "titre", "contenu", "image", "date_publication"]


class ActiviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activite
        fields = ["id", "titre", "categorie", "description", "image"]


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["id", "titre", "image", "legende"]


class InscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscription
        fields = [
            "id",
            "nom",
            "prenom",
            "date_naissance",
            "telephone",
            "email",
            "serie_souhaitee",
            "classe_precedente",
            "message",
            "date_soumission",
        ]
        read_only_fields = ["id", "date_soumission"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "nom", "email", "telephone", "sujet", "message", "date_envoi"]
        read_only_fields = ["id", "date_envoi"]
