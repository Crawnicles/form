from django.db import models

# Create your models here.
class MachineLog(models.Model):
    name = models.CharField(max_length=100)
    machine = models.CharField(max_length=100)
    date = models.DateField()
    workOrder = models.CharField(max_length=100)
    serialNumber = models.CharField(max_length=100)
    partNumber = models.CharField(max_length=100)
    quantity = models.IntegerField(null=True, blank=True)
    notes = models.TextField()
    setupTime = models.CharField(max_length=100)
    machiningTime = models.CharField(max_length=100)

    def __str__(self):
        return self.name