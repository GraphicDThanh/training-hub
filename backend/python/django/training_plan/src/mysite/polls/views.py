from django.shortcuts import render
from django.http import HttpResponse, Http404
from .models import Poll
from django.core.exceptions import PermissionDenied
from django.shortcuts import render_to_response

# Create your views here.
def index(request):
    return HttpResponse('Hello, world. You\'re at the polls index.')

def detail(request, poll_id):
    try:
        p = Poll.objects.get(pk=poll_id)
    except Poll.DoesNotExist:
        raise Http404('Poll does not exist')
    return render(request, 'polls/detail.html', {'poll': p})

def error(request, error_id):
    if error_id == 404:
        return HttpResponse('440044', status=404)
    elif error_id == 403:
        raise PermissionDenied

def handler403(request, exception, template_name="403.html"):
    return render(request, '403.html', status=403)

