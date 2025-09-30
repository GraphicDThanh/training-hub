from django.shortcuts import render
from django.http import HttpResponse

def blog(self):
    return HttpResponse('<h1>Hello blog</h1>')
