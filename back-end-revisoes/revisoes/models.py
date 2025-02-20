from typing import Any
from django.db import models
from datetime import datetime
from assunto_revisao.models import AssuntoRevisaoModel
from django.utils.timezone import now

dificuldade = (
  ("f", "fácil"),
  ("m", "médio"),
  ("d", "difícil")
)
class RevisoesModel(models.Model):

    nome = models.CharField(blank=False, null=False, max_length=100)
    area = models.CharField(blank=False, null=False, max_length=100)
    url_notion = models.URLField(blank=False, null=False, max_length=500)
    ultima_data = models.DateField(blank=False, null=False, default=now)
    proxima_data = models.DateField(blank=False, null=False, default=now)
    intervalo_revisao = models.IntegerField(blank=False, null=False)
    dificuldade = models.CharField(
        blank=False, null=False, max_length=1, choices=dificuldade, default="m"
    )
    ativo = models.BooleanField(default=True, blank=False, null=False)
    assunto = models.ForeignKey(
        AssuntoRevisaoModel, on_delete=models.CASCADE, null=True, blank=True
    )
    numero_revisao = models.FloatField(blank=True, null=True)
