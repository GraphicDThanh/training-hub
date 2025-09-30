from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    title = forms.CharField(label='', widget=forms.TextInput(attrs={'placeholder': 'Your title'}))
    description = forms.CharField(
        required=False,
        widget=forms.Textarea(
            attrs={
                'placeholder': 'Your description',
                'class': 'new-class-name two',
                'id': 'my-text-area',
                'rows': 20,
                'cols': 50,
            }
        )
    )
    price = forms.DecimalField()
    email = forms.EmailField()

    class Meta:
        model = Product
        fields = [
            'title',
            'description',
            'price'
        ]

    def clean_title(self, *args, **kwargs):
        title = self.cleaned_data.get('title')
        if not 'CFE' in title:
            raise forms.ValidationError('This is not a valid title')
        if not 'Title' in title:
            raise forms.ValidationError('This is not a valid title')
        if not 'Me' in title:
            raise forms.ValidationError('This is not a valid title')
        else:
            return title

    def clean_email(self, *args, **kwargs):
        email = self.cleaned_data.get('email')
        if not email.endswith('edu'):
            raise forms.ValidationError('This is not a valid email')
        return email

class RawProductForm(forms.Form):
    title = forms.CharField(label='', widget=forms.TextInput(attrs={'placeholder': 'Your title'}))
    description = forms.CharField(
        required=False,
        widget=forms.Textarea(
            attrs={
                'placeholder': 'Your description',
                'class': 'new-class-name two',
                'id': 'my-text-area',
                'rows': 20,
                'cols': 50,
            }
        )
    )
    price = forms.DecimalField()
