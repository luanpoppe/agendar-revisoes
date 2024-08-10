from rest_framework.serializers import ModelSerializer

from revisoes.models import RevisoesModel

class RevisoesSerializer(ModelSerializer):
  class Meta:
    model = RevisoesModel
    exclude = []