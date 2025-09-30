from django.http import HttpResponse
from django.shortcuts import render
# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, 'home.html', {})

def contact_view(request, *args, **kwargs):
    return render(request, 'contact.html', {})

def about_view(request, *args, **kwargs):
    my_context = {
        'my_text': 'this is about us',
        'my_number': 233,
        'my_list': [1, 2, 3, 4, 312, 'because']
    }

    return render(request, 'about.html', my_context)

def social_view(request, *args, **kwargs):
    return render(request, 'social.html', {})

