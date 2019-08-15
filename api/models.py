from django.db import models

# Create your models here.
class Comment(models.Model) :
    my_profile = models.CharField(max_length=255)
    bloger_profile = models.CharField(max_length=255)
    review = models.CharField(max_length = 1000)
    mark = models.IntegerField()
