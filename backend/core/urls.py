from rest_framework.routers import DefaultRouter
from .views import (
    SerieViewSet,
    ActualiteViewSet,
    ActiviteViewSet,
    PhotoViewSet,
    InscriptionViewSet,
    ContactMessageViewSet,
)

router = DefaultRouter()
router.register("series", SerieViewSet, basename="serie")
router.register("actualites", ActualiteViewSet, basename="actualite")
router.register("vie-etudiante", ActiviteViewSet, basename="activite")
router.register("galerie", PhotoViewSet, basename="photo")
router.register("inscriptions", InscriptionViewSet, basename="inscription")
router.register("contact", ContactMessageViewSet, basename="contact")

urlpatterns = router.urls
