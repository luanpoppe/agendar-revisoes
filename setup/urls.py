from django.contrib import admin
from django.urls import path

from revisoes.views import revisoesView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('revisoes/', revisoesView)
]