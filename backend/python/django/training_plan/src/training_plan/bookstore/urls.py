from django.urls import path

from bookstore.views import PublisherList, BookDetail

urlpatterns = [
    path('books', PublisherList.as_view(), name='publisher-list'),
    path('book/<int:pk>/', BookDetail.as_view(), name='book-detail'),
]
