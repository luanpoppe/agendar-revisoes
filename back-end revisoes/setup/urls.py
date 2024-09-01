from django.contrib import admin
from django.urls import path

from revisoes.views import revisoesHojeView, revisoesView, updateReview, pequenasRevisoesView, updatePequenasRevisoes

urlpatterns = [
    path('admin/', admin.site.urls),
    path('revisoes/', revisoesView),
    path("revisoes-hoje/", revisoesHojeView),
    path("revisao/<int:id>", updateReview),
    path("revisoes-pequenas-hoje/", pequenasRevisoesView),
    path("revisao-pequena/<int:id>", updatePequenasRevisoes)
]