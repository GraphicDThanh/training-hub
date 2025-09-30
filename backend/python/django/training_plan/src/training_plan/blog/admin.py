from django.contrib import admin

# Register your models here.
from .models import Blog, Entry, Author

admin.site.register([Blog, Entry, Author])

