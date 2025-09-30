from django.db import models
from django.db.models import Avg
from phonenumber_field.modelfields import PhoneNumber

# TODO: Create a custom QuerySet that only gets employees with Status is Active
class EmployeeQuerySet(models.QuerySet):
    def active(self):
        return self.filter(status='ACTIVE')

# custom QuerySet method from the manager
class EmployeeManager(models.Manager):
    def get_queryset(self):
        return EmployeeQuerySet(self.model, using=self._db)

    def active(self):
        return self.get_queryset().active()

# TODO: Create a custom Manager that only gets employees have age more than 25
class OlderEmployeeManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(age__gt=25)

class Department(models.Model):
    department_name = models.CharField(max_length=100)

    def __str__(self):
        return self.department_name

    def get_absolute_url(self):
        return '/department/%i/' % self.pk

class Employee(models.Model):
    """
    Store a single employee, related to :model:`employee_manager.Department`.
    """
    ACTIVE = 'ACTIVE'
    DISABLE = 'DISABLE'
    STATUS_CHOICES = (
        (ACTIVE, 'Active'),
        (DISABLE, 'Disable')
    )

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.PositiveSmallIntegerField()
    status = models.CharField(
        max_length=7,
        choices=STATUS_CHOICES,
        default=ACTIVE
    )

    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    # managers
    objects = EmployeeManager()
    older_employee_objects = OlderEmployeeManager()

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    def get_absolute_url(self):
        return '/employee/%i/' % self.pk

    @property
    def full_name(self):
        """Make fullname from first_name and last_name"""
        return self.first_name + ' ' + self.last_name


class Contact(models.Model):
    """
    Store a single contact, related to :model:`employee_manager:Employee`.
    """
    contact_name = models.CharField(max_length=50)
    email_address = models.EmailField()
    phone_number = PhoneNumber()
    other_contact_details = models.TextField(null=True, blank=True)

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    def __str__(self):
        return self.contact_name + ' of ' + self.employee.full_name()

    def get_absolute_url(self):
        return '/contact/%i/' % self.pk

# TODO: Try to use Aggregation to calculate average age of employees
# Employee.objects.all().annotate(avg_age=Avg('age'))
