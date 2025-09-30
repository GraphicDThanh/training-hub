from django.contrib import admin
from .models import Author, Publisher, Book, Store
# Register your models here.
admin.site.register([Author, Publisher, Book, Store])
