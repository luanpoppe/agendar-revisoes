from django.contrib import admin
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView
from assunto_revisao.views import AssuntosListCreateView

from revisoes.views import revisoesHojeView, revisoesView, updateReview, pequenasRevisoesView, updatePequenasRevisoes, pequenasRevisoesHojeView

schema_view = get_schema_view(
    openapi.Info(
        title="Swagger API testando",
        default_version="1.0.0",
        description="Swagger de revisões"
    ),
    public=True
)

urlpatterns = [
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="swagger-schema",
    ),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("admin/", admin.site.urls),
    path("revisoes/", revisoesView),
    path("revisoes-hoje/", revisoesHojeView),
    path("revisao/<int:id>", updateReview),
    path("revisoes-pequenas/", pequenasRevisoesView),
    path("revisao-pequena/<int:id>", updatePequenasRevisoes),
    path("revisoes-pequenas-hoje/", pequenasRevisoesHojeView),
    path("assuntos/", AssuntosListCreateView.as_view()),
]
