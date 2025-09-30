from django import forms
from django.contrib.auth import forms as auth_forms
from profiles.models import User


class SignUpForm(auth_forms.UserCreationForm):
    username = forms.CharField(
        max_length=30,
        required=True,
        help_text='username',
    )
    first_name = forms.CharField(
        max_length=30,
        required=False,
        help_text='first name',
    )
    last_name = forms.CharField(
        max_length=30,
        required=False,
        help_text='last name',
    )
    email = forms.CharField(max_length=254, help_text='email')
    password1 = forms.CharField(help_text='pasword')
    password2 = forms.CharField(help_text='confirm pasword')

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'password1',
            'password2',
        )

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
        for _, value in self.fields.items():
            value.widget.attrs['placeholder'] = value.help_text
            value.widget.attrs['class'] = 'form-control'
