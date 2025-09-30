from django.http import HttpResponse, HttpResponseNotFound
import datetime

def index(request):
    return HttpResponse('Hello, world. You\'re at the examples index.')

def current_datetime(request):
    now = datetime.datetime.now()
    html = '<html><body>It is now %s</body></html>' % now
    return HttpResponse(html)

def my_view(request, foo):
    if foo == 0:
        return HttpResponseNotFound('<h1>Page not found</h1>')
    elif foo == 1:
        return HttpResponse('<h1>Page was found</h1>')
    elif foo == 2:
        return HttpResponse(status=403)
