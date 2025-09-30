from django.contrib import admin
from django.contrib.auth import get_user_model

USER_MODEL = get_user_model()


@admin.register(USER_MODEL)
class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "email", "first_name", "last_name", "created", "modified"]
    list_filter = ["created"]
    search_fields = ["email"]
