from typing import Any
from django.db import models


class AssuntoRevisaoModel(models.Model):
    assunto = models.CharField(blank=True, null=True, max_length=100)
