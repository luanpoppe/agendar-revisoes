from setup.main_imports import (
    api_view,
    Response,
    datetime,
    extend_schema,
    APIView,
)

from assunto_revisao.serializers import AssuntosSerializer
from assunto_revisao.models import AssuntoRevisaoModel
from utils.manage_data import adicionarRevisao, daysFromToday, formatDate


class AssuntosListCreateView(APIView):
    def get(self, request):
        revisoes = AssuntoRevisaoModel.objects.all()
        serializer = AssuntosSerializer(revisoes, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = AssuntosSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # intervalo = serializer.validated_data["intervalo_revisao"]
            # serializer.validated_data["proxima_data"] = adicionarRevisao(
            #     intervalo, AssuntoRevisaoModel
            # )
            valor_salvo = serializer.save()

            model = AssuntoRevisaoModel.objects.get(pk=valor_salvo.pk)
            responseSerializer = AssuntosSerializer(model)
            return Response(responseSerializer.data)


@extend_schema(
    request=AssuntosSerializer,
)
@api_view(["GET", "POST"])
def revisoesView(request):
    if request.method == "POST":
        serializer = AssuntosSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            intervalo = serializer.validated_data["intervalo_revisao"]
            serializer.validated_data["proxima_data"] = adicionarRevisao(
                intervalo, AssuntoRevisaoModel
            )
            valor_salvo = serializer.save()

            model = AssuntoRevisaoModel.objects.get(pk=valor_salvo.pk)
            responseSerializer = AssuntosSerializer(model)
            return Response(responseSerializer.data)

    if request.method == "GET":

        revisoes = AssuntoRevisaoModel.objects.all().order_by("intervalo_revisao")
        serializer = AssuntosSerializer(revisoes, many=True)

        return Response(serializer.data)


@api_view(["GET", "PATCH", "DELETE"])
def updateReview(request, id):
    try:
        model = AssuntoRevisaoModel.objects.get(pk=id)
        serializer = AssuntosSerializer(model, data=request.data, partial=True)

        if request.method == "GET":
            serializer = AssuntosSerializer(model)
            return Response(serializer.data)

        if request.method == "PATCH":
            try:
                if serializer.is_valid(raise_exception=True):
                    intervalo = serializer.validated_data["intervalo_revisao"]
                    serializer.validated_data["proxima_data"] = adicionarRevisao(
                        intervalo, AssuntoRevisaoModel
                    )
                    serializer.validated_data["ultima_data"] = formatDate(
                        datetime.now()
                    )
                    serializer.save()
                    return Response(serializer.data)
            except:
                return Response(
                    {"msg": "Passe um intervalo para a próxima revisão"}, status=400
                )

        if request.method == "DELETE":
            model.delete()
            return Response({"msg": f"Item de id {id} deletado com sucesso"})

    except:
        return Response({"msg": f"A revisão com o id {id} não existe"})


@api_view(["GET"])
def revisoesHojeView(request):
    if request.method == "GET":
        data = formatDate(daysFromToday(0)).split("-")
        data = datetime(year=int(data[0]), month=int(data[1]), day=int(data[2])).date()
        revisoes = AssuntoRevisaoModel.objects.filter(
            proxima_data__lte=data, ativo=True
        ).order_by("intervalo_revisao")
        serializer = AssuntosSerializer(revisoes, many=True)
        return Response(serializer.data)


@api_view(["GET", "POST"])
def pequenasRevisoesView(request):
    if request.method == "POST":
        serializer = AssuntosSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            intervalo = serializer.validated_data["intervalo_revisao"]
            serializer.validated_data["proxima_data"] = adicionarRevisao(
                intervalo, AssuntoRevisaoModel
            )
            valor_salvo = serializer.save()

            model = AssuntoRevisaoModel.objects.get(pk=valor_salvo.pk)
            responseSerializer = AssuntosSerializer(model)
            return Response(responseSerializer.data)

    if request.method == "GET":

        revisoes = AssuntoRevisaoModel.objects.all().order_by("intervalo_revisao")
        serializer = AssuntosSerializer(revisoes, many=True)

        return Response(serializer.data)


@api_view(["GET", "PATCH", "DELETE"])
def updatePequenasRevisoes(request, id):
    try:
        model = AssuntoRevisaoModel.objects.get(pk=id)
        serializer = AssuntosSerializer(model, data=request.data, partial=True)

        if request.method == "GET":
            serializer = AssuntosSerializer(model)
            return Response(serializer.data)

        if request.method == "PATCH":
            try:
                if serializer.is_valid(raise_exception=True):
                    intervalo = serializer.validated_data["intervalo_revisao"]
                    serializer.validated_data["proxima_data"] = adicionarRevisao(
                        intervalo, AssuntoRevisaoModel
                    )
                    serializer.validated_data["ultima_data"] = formatDate(
                        datetime.now()
                    )
                    serializer.save()
                    return Response(serializer.data)
            except:
                return Response(
                    {"msg": "Passe um intervalo para a próxima revisão"}, status=400
                )

        if request.method == "DELETE":
            model.delete()
            return Response({"msg": f"Item de id {id} deletado com sucesso"})

    except:
        return Response({"msg": f"A revisão com o id {id} não existe"})


@api_view(["GET"])
def pequenasRevisoesHojeView(request):
    if request.method == "GET":
        data = formatDate(daysFromToday(0)).split("-")
        data = datetime(year=int(data[0]), month=int(data[1]), day=int(data[2])).date()
        revisoes = AssuntoRevisaoModel.objects.filter(
            proxima_data__lte=data, ativo="True"
        ).order_by("intervalo_revisao")
        serializer = AssuntosSerializer(revisoes, many=True)
        return Response(serializer.data)
