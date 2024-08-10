from typing import Any
from django.db import models
from datetime import datetime

class RevisoesModel(models.Model):
  dificuldade = (
    ("f", "fácil"),
    ("m", "médio"),
    ("d", "difícil")
  )

  nome = models.CharField(blank=False, null=False, max_length=100)
  area = models.CharField(blank=False, null=False, max_length=100)
  url_notion = models.URLField(blank=False, null=False, max_length=500)
  ultima_data = models.DateField(blank=False, null=False, default=datetime.now())
  proxima_data = models.DateField(blank=False, null=False, default=datetime.now())
  intervalo_revisao = models.IntegerField(blank=False, null=False)
  dificuldade = models.CharField(blank=False, null=False, max_length=1, choices=dificuldade, default="m")