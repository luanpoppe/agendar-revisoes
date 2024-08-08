from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from revisoes.models import RevisoesModel

@api_view(["GET", "POST"])
def revisoesView(request):
  if(request.method == "POST"):
    print("é um post")








  if(request.method == "GET"):

    revisoes = RevisoesModel.objects.all()

    print('infosRevisoes', revisoes)
    print('infosRevisoes', revisoes.values())
    lista = revisoes.values()
    print('\n\n\n')

    # variavel = {
    #   "nome": "Mariana"
    # }

    return Response(lista)