from django.contrib.auth.models import AbstractUser
from django.db import models

class UserRole(models.TextChoices):
    ADMIN = 'ADMIN', 'Admin'
    MAKLER = 'MAKLER', 'Makler (Uy egasi)'
    TALABA = 'TALABA', 'Talaba (Ijarachi)'

class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(
        max_length=10, 
        choices=UserRole.choices, 
        default=UserRole.TALABA,
        help_text="Foydalanuvchining tizimdagi huquq va roli"
    )
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    saved_properties = models.ManyToManyField('listings.Property', blank=True, related_name='saved_by')

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
