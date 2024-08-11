from django.contrib import admin
from django.urls import path

from revisoes.views import revisoesHojeView, revisoesView, updateReview

urlpatterns = [
    path('admin/', admin.site.urls),
    path('revisoes/', revisoesView),
    path("revisoes-hoje/", revisoesHojeView),
    path("revisao/<int:id>", updateReview)
]