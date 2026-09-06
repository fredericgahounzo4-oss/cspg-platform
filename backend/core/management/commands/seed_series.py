from django.core.management.base import BaseCommand
from core.models import Serie


SERIES = [
    ("A4", "Lettres et Philosophie", "general", 1),
    ("S", "Sciences (C4 et D)", "general", 2),
    ("G1", "Organisation Administrative de Secrétariat", "general", 3),
    ("G2", "Techniques Quantitatives de Gestion", "general", 4),
    ("G3", "Techniques Commerciales", "general", 5),
    ("F2", "Electronique", "technique", 6),
    ("F3", "Electrotechnique", "technique", 7),
    ("F4", "Génie Civil", "technique", 8),
]


class Command(BaseCommand):
    help = "Pré-remplit les séries proposées par le C.S.P.G La Grâce"

    def handle(self, *args, **options):
        for code, nom, cycle, ordre in SERIES:
            serie, created = Serie.objects.update_or_create(
                code=code, defaults={"nom": nom, "cycle": cycle, "ordre": ordre}
            )
            status = "créée" if created else "mise à jour"
            self.stdout.write(self.style.SUCCESS(f"Série {code} {status}"))
