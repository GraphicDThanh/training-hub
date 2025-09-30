from django.contrib import admin
from .models import Student, Worker, Clothes

admin.site.register([Student, Worker, Clothes])
