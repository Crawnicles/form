from django.shortcuts import render
from django.http import JsonResponse
from .models import MachineLog
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def submit_machine_log(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        log_entry = MachineLog.objects.create(**data)
        return JsonResponse({"message": "Log entry created successfully", "id": log_entry.id})
    return JsonResponse({"error": "Method not allowed"}, status=405)
