from rest_framework.decorators import api_view
from rest_framework.response import Response

from revisoes.models import RevisoesModel
from revisoes.serializers import RevisoesSerializer
from utils.manage_data import adicionarRevisao, daysFromToday, formatDate
from datetime import datetime

@api_view(["GET", "POST"])
def revisoesView(request):
  if(request.method == "POST"):
    serializer = RevisoesSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
      intervalo = serializer.validated_data["intervalo_revisao"]
      serializer.validated_data["proxima_data"] = adicionarRevisao(intervalo)
      valor_salvo = serializer.save()

      model = RevisoesModel.objects.get(pk=valor_salvo.pk)
      responseSerializer = RevisoesSerializer(model)
      return Response(responseSerializer.data)

  if(request.method == "GET"):

    revisoes = RevisoesModel.objects.all()
    serializer = RevisoesSerializer(revisoes, many=True)

    return Response(serializer.data)

@api_view(["GET", "PATCH", "DELETE"])
def updateReview(request, id):
  try:
    model = RevisoesModel.objects.get(pk=id)
    serializer = RevisoesSerializer(model, data=request.data, partial=True)
    
    if request.method == "GET":
      serializer = RevisoesSerializer(model)
      return Response(serializer.data)
    
    if request.method == "PATCH":
      try:
        if serializer.is_valid(raise_exception=True):
          intervalo = serializer.validated_data["intervalo_revisao"]
          serializer.validated_data["proxima_data"] = adicionarRevisao(intervalo)
          serializer.save()
          return Response(serializer.data)
      except:
        return Response({"msg": "Passe um intervalo para a próxima revisão"}, status=400)

    if request.method == "DELETE":
        model.delete()
        return Response({"msg": f"Item de id {id} deletado com sucesso"})
    
  except:
    return Response({
      "msg": f"A revisão com o id {id} não existe"
    })

@api_view(["GET"])
def revisoesHojeView(request):
  if request.method == "GET":
    data = formatDate(daysFromToday(0)).split("-")
    data = datetime(year=int(data[0]), month=int(data[1]), day=int(data[2])).date()
    revisoes = RevisoesModel.objects.filter(proxima_data__lte=data)
    serializer = RevisoesSerializer(revisoes, many=True)
    return Response(serializer.data)