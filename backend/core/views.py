from rest_framework import viewsets, mixins, permissions
from .models import Serie, Actualite, Activite, Photo, Inscription, ContactMessage
from .serializers import (
    SerieSerializer,
    ActualiteSerializer,
    ActiviteSerializer,
    PhotoSerializer,
    InscriptionSerializer,
    ContactMessageSerializer,
)


class SerieViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Lecture publique des séries actives."""

    queryset = Serie.objects.filter(actif=True)
    serializer_class = SerieSerializer
    permission_classes = [permissions.AllowAny]


class ActualiteViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Lecture publique des actualités publiées."""

    queryset = Actualite.objects.filter(publie=True)
    serializer_class = ActualiteSerializer
    permission_classes = [permissions.AllowAny]


class ActiviteViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Lecture publique des activités de la vie étudiante."""

    queryset = Activite.objects.filter(actif=True)
    serializer_class = ActiviteSerializer
    permission_classes = [permissions.AllowAny]


class PhotoViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Lecture publique de la galerie photo."""

    queryset = Photo.objects.filter(actif=True)
    serializer_class = PhotoSerializer
    permission_classes = [permissions.AllowAny]


class InscriptionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Le public peut soumettre une pré-inscription (création uniquement)."""

    queryset = Inscription.objects.all()
    serializer_class = InscriptionSerializer
    permission_classes = [permissions.AllowAny]


class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Le public peut envoyer un message de contact (création uniquement)."""

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]
