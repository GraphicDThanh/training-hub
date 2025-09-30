from django.shortcuts import render
from employee_manager.models import Employee
# Create your views here.
def my_emmployee_view(request, age):
    """
    Display an individual :model:`employee_manager.Employee`.

    **Context**
    ``mymodel``
        An instance of :model:`employee_manager.Employee`

    **Template**
    :template:`employee_manager/templates/my_employee.html`
    """

    context = {
        'mymodel': Employee.objects.get(age=age)
    }

    return render(request, 'my_employee.html', context)
