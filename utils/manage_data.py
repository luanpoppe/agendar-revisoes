from datetime import datetime, timedelta
import math

from revisoes.models import RevisoesModel
from revisoes.serializers import RevisoesSerializer

def daysFromToday(dias):
  return datetime.now() + timedelta(days=dias)

def daysFromDate(dia: datetime, dias):
  return dia + timedelta(days=dias)

def formatDate(data):
  return data.strftime("%Y-%m-%d")


# Tentar adicionar UMA revisão na data x
# Considerando o intervalo entre hoje e a data x, checar todas as datas com o intervalo de 10% a mais ou a menos
# Escolher a data que tiver menos revisões dessas
# Adicionar a revisão nessa data


def adicionarRevisao(intervaloDaRevisao: int):
  if (intervaloDaRevisao < 3):
    return formatDate(daysFromToday(intervaloDaRevisao))
  else:
    maximo = math.ceil(intervaloDaRevisao * 1.1)
    diferencaIntervaloMax = maximo - intervaloDaRevisao
    listaDatas = []
    listaObjetosCompletos = []
    listaRevisoesPorDia = []
    
    for i in range(intervaloDaRevisao - diferencaIntervaloMax, intervaloDaRevisao + diferencaIntervaloMax + 1):
      listaDatas.append(formatDate(daysFromToday(i)))
      data = formatDate(daysFromToday(i)).split("-")
      data = datetime(year=int(data[0]), month=int(data[1]), day=int(data[2])).date()
      listaObjetosCompletos.append(RevisoesModel.objects.filter(proxima_data=data))

    for i in listaObjetosCompletos:
      print('i', i)
      listaRevisoesPorDia.append(len(i))

    menorValor = min(listaRevisoesPorDia)
    
    for index in range(0, len(listaRevisoesPorDia)):
      if (menorValor == listaRevisoesPorDia[index]):
        return listaDatas[index]