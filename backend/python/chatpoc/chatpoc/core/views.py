from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from core.forms import SignUpForm


@login_required(login_url='/login/')
def home_view(request):
    """home view"""
    return render(request, 'core/home.html')


def index_view(request):
    """Welcome view"""
    if request.user.is_authenticated:
        return redirect('home')

    return render(request, 'core/index.html')


def signup_view(request):
    """sign up view"""
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            form = SignUpForm(request.POST)
            if form.is_valid():
                form.save()
                username = form.cleaned_data.get('username')
                raw_password = form.cleaned_data.get('password1')
                user = authenticate(username=username, password=raw_password)
                login(request, user)
                return redirect('home')

        form = SignUpForm()
        return render(request, 'core/signup.html', {'form': form})
