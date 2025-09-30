from django.shortcuts import render
from django.utils import timezone
from django.views.generic import ListView, DetailView

from bookstore.models import Publisher, Book

class PublisherList(ListView):
    model = Publisher
    template_name='bookstore/publisher_list.html'

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)

    #     print('get_context_publisher', context)
    #     return context


class BookDetail(DetailView):
    model = Book
    template_name='bookstore/book_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['now'] = timezone.now()
        return context
