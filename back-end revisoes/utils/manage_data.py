from datetime import datetime, timedelta
import math

from revisoes.models import RevisoesModel

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
  if (intervaloDaRevisao < 2):
    return formatDate(daysFromToday(intervaloDaRevisao))
  else:
    # Caso o intervalo seja 2 dias, as únicas possibilidades serão ou em 2 dias, ou em 1 dia, mas não poderá ser em 03 dias
    if (intervaloDaRevisao == 2):
      datas = [formatDate(daysFromToday(1)).split("-"), formatDate(daysFromToday(2)).split("-")]
      umDia = datetime(year=int(datas[0][0]), month=int(datas[0][1]), day=int(datas[0][2])).date()
      doisDias = datetime(year=int(datas[1][0]), month=int(datas[1][1]), day=int(datas[1][2])).date()

      revisoesEmUmDia = RevisoesModel.objects.filter(proxima_data=umDia)
      revisoesEmDoisDias = RevisoesModel.objects.filter(proxima_data=doisDias)
      if len(revisoesEmDoisDias) > len(revisoesEmUmDia):
        return umDia
      else:
        return doisDias

    # valores baseados no intervalo de 3 dias
    maximo = math.ceil(intervaloDaRevisao * 1.1) #4
    diferencaIntervaloMax = maximo - intervaloDaRevisao #1
    listaDatas = []
    listaObjetosCompletos = []
    listaRevisoesPorDia = []
    
    for i in range(intervaloDaRevisao - diferencaIntervaloMax, intervaloDaRevisao + diferencaIntervaloMax + 1): #range(2, 4)
      listaDatas.append(formatDate(daysFromToday(i)))
      data = formatDate(daysFromToday(i)).split("-")
      data = datetime(year=int(data[0]), month=int(data[1]), day=int(data[2])).date()
      listaObjetosCompletos.append(RevisoesModel.objects.filter(proxima_data=data))

    for i in listaObjetosCompletos:
      print('i', i)
      listaRevisoesPorDia.append(len(i))

    menorValor = min(listaRevisoesPorDia)
    
    for index in range(0, len(listaRevisoesPorDia)): #range(0,2)
      if (menorValor == listaRevisoesPorDia[index]):
        return listaDatas[index]