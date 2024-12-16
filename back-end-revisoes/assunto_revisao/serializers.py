from setup.main_imports import ModelSerializer

from assunto_revisao.models import AssuntoRevisaoModel


class AssuntosSerializer(ModelSerializer):
    class Meta:
        model = AssuntoRevisaoModel
        exclude = []
