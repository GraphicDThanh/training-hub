from django.db import models
from common.models import People

# Models example for many-to-one relationships
# Do practice many-to-one relationship follow https://docs.djangoproject.com/en/2.1/topics/db/examples/many_to_one/
# Do practice many-to-many relationship follow https://docs.djangoproject.com/en/2.1/topics/db/examples/many_to_many/
# go `python3 manage.py shell` to play with API
class Reporter(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)

class Publication(models.Model):
    title = models.CharField(max_length=30)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('title',)

class Article(models.Model):
    headline = models.CharField(max_length=100)
    # pub_date = models.DateField()
    # reporter = models.ForeignKey(Reporter, on_delete=models.CASCADE)
    publications = models.ManyToManyField(Publication)

    def __str__(self):
        return self.headline

    class Meta:
        ordering = ('headline',)


# extra fields on many-to-many relationships
class Person(models.Model):
    name = models.CharField(max_length=128)
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30, null=True)

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Person, through='Membership')

    def __str__(self):
        return self.name


class Membership(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=64)

# Meta inheritance
class CommonInfo(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()

    class Meta:
        abstract = True
        ordering = ['name']

class Student(CommonInfo):
    classname = models.CharField(max_length=100)

    class Meta(CommonInfo.Meta):
        db_table = 'student_info'


class AdvancedStudent(Student):
    special_field = models.TextField()


# Meta becareful with related_name & related_query_name
class Worker(People):
    job = models.CharField(max_length=100)
    company = models.CharField(max_length=100)

# Multi table inheritance
class Children(Person):
    age = models.SmallIntegerField()

#
class MyPerson(Person):
    class Meta:
        proxy = True

    def do_something(self):
        pass

class OrderedPerson(Person):
    class Meta:
        ordering = ['last_name']
        proxy = True
