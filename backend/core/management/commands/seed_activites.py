from django.core.management.base import BaseCommand
from core.models import Activite


ACTIVITES = [
    ("club", "Club d'Excellence Scientifique", "Ateliers de sciences, exposés et préparation aux olympiades pour les élèves de S et F.", 1),
    ("club", "Club d'Anglais", "Conversation, théâtre en anglais et préparation aux concours linguistiques.", 2),
    ("club", "Club Informatique", "Initiation à la programmation, bureautique et maintenance de base.", 3),
    ("sport", "Football", "Entraînements hebdomadaires et tournois inter-classes et inter-établissements.", 4),
    ("sport", "Basketball", "Section basket mixte, avec matchs amicaux durant l'année scolaire.", 5),
    ("sport", "Athlétisme", "Préparation aux compétitions scolaires régionales.", 6),
    ("culture", "Chorale & Musique", "Répétitions hebdomadaires et prestations lors des cérémonies du complexe.", 7),
    ("culture", "Théâtre & Slam", "Ateliers d'expression artistique et représentations en fin de trimestre.", 8),
    ("evenement", "Journée Culturelle", "Une journée annuelle dédiée aux danses, mets et costumes traditionnels togolais.", 9),
    ("evenement", "Remise des Prix d'Excellence", "Cérémonie de fin d'année récompensant les meilleurs élèves de chaque série.", 10),
]


class Command(BaseCommand):
    help = "Pré-remplit les activités de la vie étudiante du C.S.P.G La Grâce"

    def handle(self, *args, **options):
        for categorie, titre, description, ordre in ACTIVITES:
            activite, created = Activite.objects.update_or_create(
                titre=titre,
                defaults={"categorie": categorie, "description": description, "ordre": ordre},
            )
            status = "créée" if created else "mise à jour"
            self.stdout.write(self.style.SUCCESS(f"Activité « {titre} » {status}"))
