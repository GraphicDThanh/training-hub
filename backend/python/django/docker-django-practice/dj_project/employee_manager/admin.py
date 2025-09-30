from django.contrib import admin
from .models import Contact, Employee, Department

admin.site.register([Contact, Employee, Department])
