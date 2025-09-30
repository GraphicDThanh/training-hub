from django.db import models

# Create your models here.
class Clothes(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)

class People(models.Model):
    name = models.CharField(max_length=100)
    age = models.SmallIntegerField()

    clothes = models.ManyToManyField(
        Clothes,
        related_name='%(app_label)s_%(class)s_related',
        related_query_name='(app_label)s_%(class)ss'
    )

    class Meta:
        abstract = True

class Student(People):
    grade = models.SmallIntegerField()
    school = models.CharField(max_length=100)

class Worker(People):
    job = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
