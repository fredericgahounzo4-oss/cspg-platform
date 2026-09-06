import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Crée (ou met à jour le mot de passe d') un superutilisateur à partir de
    variables d'environnement. Utile sur les plans hébergeurs gratuits
    (ex. Render) qui ne fournissent pas de terminal interactif.

    Variables lues : DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL,
    DJANGO_SUPERUSER_PASSWORD. Si l'une d'elles manque, la commande ne fait
    rien (silencieusement) pour ne jamais bloquer un déploiement normal.
    """

    help = "Crée le superutilisateur admin depuis les variables d'environnement, si fournies"

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "")

        if not username or not password:
            self.stdout.write("DJANGO_SUPERUSER_USERNAME/PASSWORD non définis — étape ignorée.")
            return

        User = get_user_model()
        user, created = User.objects.get_or_create(
            username=username, defaults={"email": email, "is_staff": True, "is_superuser": True}
        )
        user.email = email or user.email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        action = "créé" if created else "mis à jour (mot de passe actualisé)"
        self.stdout.write(self.style.SUCCESS(f"Superutilisateur « {username} » {action}."))
