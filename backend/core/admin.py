from django.contrib import admin
from .models import Serie, Actualite, Activite, Photo, Inscription, ContactMessage


@admin.register(Serie)
class SerieAdmin(admin.ModelAdmin):
    list_display = ("code", "nom", "cycle", "ordre", "actif")
    list_editable = ("ordre", "actif")
    list_filter = ("cycle", "actif")
    search_fields = ("code", "nom")


@admin.register(Actualite)
class ActualiteAdmin(admin.ModelAdmin):
    list_display = ("titre", "date_publication", "publie")
    list_filter = ("publie",)
    search_fields = ("titre", "contenu")
    date_hierarchy = "date_publication"


@admin.register(Activite)
class ActiviteAdmin(admin.ModelAdmin):
    list_display = ("titre", "categorie", "ordre", "actif")
    list_editable = ("ordre", "actif")
    list_filter = ("categorie", "actif")
    search_fields = ("titre", "description")


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ("titre", "legende", "ordre", "actif")
    list_editable = ("ordre", "actif")
    list_filter = ("actif",)
    search_fields = ("titre", "legende")


@admin.register(Inscription)
class InscriptionAdmin(admin.ModelAdmin):
    list_display = ("nom", "prenom", "telephone", "serie_souhaitee", "statut", "date_soumission")
    list_editable = ("statut",)
    list_filter = ("statut", "serie_souhaitee")
    search_fields = ("nom", "prenom", "telephone", "email")
    date_hierarchy = "date_soumission"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("nom", "sujet", "email", "date_envoi", "lu")
    list_editable = ("lu",)
    list_filter = ("lu",)
    search_fields = ("nom", "email", "message")
    date_hierarchy = "date_envoi"
