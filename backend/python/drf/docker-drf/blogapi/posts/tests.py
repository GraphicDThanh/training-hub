from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.test import TestCase
from rest_framework.test import APITestCase, APIRequestFactory, APIClient

from django.contrib.auth.models import User

from .models import Post
from .views import PostViewSet

class TestBlog(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Create a user
        testuser1 = User.objects.create_user(
            username='testuser1',
            password='abc123'
        )
        testuser1.save()

        # Create a blog post
        test_post = Post.objects.create(
            author=testuser1,
            title='Blog Title',
            body='Body content...'
        )
        test_post.save()

    def test_blog_content(self):
        post = Post.objects.get(id=1)
        expected_author = f'{post.author}'
        expected_title = f'{post.title}'
        expected_body = f'{post.body}'

        self.assertEqual(expected_author, 'testuser1')
        self.assertEqual(expected_title, 'Blog Title')
        self.assertEqual(expected_body, 'Body content...')

# Example test not authenticated
# class TestBlogAPI(APITestCase):
#     def setUp(self):
#         self.factory = APIRequestFactory()
#         self.view = PostViewSet.as_view({'get': 'list'})
#         self.uri = '/posts/'

#     def test_post_list(self):
#         request = self.factory.get(self.uri)
#         response = self.view(request)

#         self.assertEqual(response.status_code, 200,
#                          'Expected Response Code 200, received {0} instead.'
#                          .format(response.status_code))

class TestBlogAPI(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = PostViewSet.as_view({'get': 'list'})
        self.uri = '/api/v1/posts/'
        self.user = self.setup_user()
        self.token = Token.objects.create(user=self.user)
        self.token.save()

    @staticmethod
    def setup_user():
        User = get_user_model()
        return User.objects.create_user(
            'test',
            email='testuser@gmail.com',
            password='test'
        )

    def test_list(self):
        request = self.factory.get(self.uri, HTTP_AUTHORIZATION='Token {}'.format(self.token.key))
        request.user = self.user

        response = self.view(request)

        self.assertEqual(response.status_code, 200, 'Expect Response Cpde 20, received {0} instead.'.format(response.status_code))

    def test_list_use_api_client(self):
        self.client.login(username="test", password="test")
        response = self.client.get(self.uri)
        self.assertEqual(response.status_code, 200,
                         'Expected Response Code 200, received {0} instead.'
                         .format(response.status_code))



