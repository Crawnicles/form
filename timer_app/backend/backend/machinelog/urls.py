# machinelog/urls.py
from django.urls import path
from .views import submit_machine_log

urlpatterns = [
    path('submit/', submit_machine_log, name='submit_machine_log'),
]
