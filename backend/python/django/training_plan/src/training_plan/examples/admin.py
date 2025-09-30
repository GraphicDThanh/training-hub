from django.contrib import admin
from .models import Reporter, Publication, Article
from .models import Person, Group, Membership
from .models import Student, AdvancedStudent


# Many-to-one, many-to-many
admin.site.register(Article)
admin.site.register(Reporter)
admin.site.register(Publication)


# extra fields on many-to-many relationships
admin.site.register(Person)
admin.site.register(Group)
admin.site.register(Membership)

# Meta inheritance
admin.site.register(Student)
admin.site.register(AdvancedStudent)
