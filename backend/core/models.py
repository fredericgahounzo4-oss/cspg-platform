from django.db import models


class Serie(models.Model):
    """Une série / filière proposée par le complexe (ex: A4, S, G1, F2...)."""

    CYCLE_CHOICES = [
        ("general", "Enseignement Général"),
        ("technique", "Enseignement Technique"),
    ]

    code = models.CharField(max_length=10, unique=True, help_text="Ex: A4, S, G1, F2")
    nom = models.CharField(max_length=150, help_text="Ex: Lettres et Philosophie")
    cycle = models.CharField(max_length=20, choices=CYCLE_CHOICES, default="general")
    description = models.TextField(blank=True)
    ordre = models.PositiveIntegerField(default=0, help_text="Ordre d'affichage")
    actif = models.BooleanField(default=True)

    class Meta:
        ordering = ["ordre", "code"]
        verbose_name = "Série"
        verbose_name_plural = "Séries"

    def __str__(self):
        return f"{self.code} — {self.nom}"


class Actualite(models.Model):
    """Une actualité / annonce publiée sur le site public."""

    titre = models.CharField(max_length=200)
    contenu = models.TextField()
    image = models.ImageField(upload_to="actualites/", blank=True, null=True)
    date_publication = models.DateTimeField(auto_now_add=True)
    publie = models.BooleanField(default=True)

    class Meta:
        ordering = ["-date_publication"]
        verbose_name = "Actualité"
        verbose_name_plural = "Actualités"

    def __str__(self):
        return self.titre


class Activite(models.Model):
    """Un club, une activité sportive/culturelle ou un événement de la vie étudiante."""

    CATEGORIE_CHOICES = [
        ("club", "Club"),
        ("sport", "Sport"),
        ("culture", "Culture"),
        ("evenement", "Événement"),
    ]

    titre = models.CharField(max_length=150)
    categorie = models.CharField(max_length=20, choices=CATEGORIE_CHOICES, default="club")
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="vie-etudiante/", blank=True, null=True)
    ordre = models.PositiveIntegerField(default=0, help_text="Ordre d'affichage")
    actif = models.BooleanField(default=True)

    class Meta:
        ordering = ["ordre", "titre"]
        verbose_name = "Activité (vie étudiante)"
        verbose_name_plural = "Activités (vie étudiante)"

    def __str__(self):
        return f"{self.get_categorie_display()} — {self.titre}"


class Photo(models.Model):
    """Une photo de la galerie du complexe (bâtiments, vie scolaire, événements...)."""

    titre = models.CharField(max_length=150, blank=True)
    image = models.ImageField(upload_to="galerie/")
    legende = models.CharField(max_length=250, blank=True)
    ordre = models.PositiveIntegerField(default=0, help_text="Ordre d'affichage")
    actif = models.BooleanField(default=True)

    class Meta:
        ordering = ["ordre", "-id"]
        verbose_name = "Photo (galerie)"
        verbose_name_plural = "Photos (galerie)"

    def __str__(self):
        return self.titre or f"Photo #{self.pk}"


class Inscription(models.Model):
    """Demande de pré-inscription soumise depuis le site public."""

    STATUT_CHOICES = [
        ("nouvelle", "Nouvelle"),
        ("contactee", "Contactée"),
        ("validee", "Validée"),
        ("rejetee", "Rejetée"),
    ]

    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField(blank=True, null=True)
    telephone = models.CharField(max_length=30)
    email = models.EmailField(blank=True)
    serie_souhaitee = models.ForeignKey(
        Serie, on_delete=models.SET_NULL, null=True, blank=True, related_name="inscriptions"
    )
    classe_precedente = models.CharField(max_length=100, blank=True)
    message = models.TextField(blank=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default="nouvelle")
    date_soumission = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date_soumission"]
        verbose_name = "Inscription"
        verbose_name_plural = "Inscriptions"

    def __str__(self):
        return f"{self.prenom} {self.nom} ({self.date_soumission:%d/%m/%Y})"


class ContactMessage(models.Model):
    """Message envoyé depuis le formulaire de contact public."""

    nom = models.CharField(max_length=150)
    email = models.EmailField(blank=True)
    telephone = models.CharField(max_length=30, blank=True)
    sujet = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    date_envoi = models.DateTimeField(auto_now_add=True)
    lu = models.BooleanField(default=False)

    class Meta:
        ordering = ["-date_envoi"]
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"

    def __str__(self):
        return f"{self.nom} — {self.sujet or 'sans sujet'}"
