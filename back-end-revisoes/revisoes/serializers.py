from rest_framework.serializers import ModelSerializer

from revisoes.models import RevisoesModel, PequenasRevisoesModel

class RevisoesSerializer(ModelSerializer):
  class Meta:
    model = RevisoesModel
    exclude = []

class PequenasRevisoesSerializer(ModelSerializer):
  class Meta:
    model = PequenasRevisoesModel
    exclude = []