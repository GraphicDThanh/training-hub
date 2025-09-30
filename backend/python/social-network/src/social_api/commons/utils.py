from datetime import datetime

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from rest_framework.response import Response

from social_api.core.factories import PhotoFactory
from social_api.user.factories import UserFactory, ProfileFactory
from social_api.user.factories import FriendFactory
from social_api.category.factories import CategoryFactory
from social_api.post.factories import PostFactory, CommentFactory, LikeFactory
from social_api.core.exceptions import ValidationError
from social_api.commons.constants import REQUIRED_INTEGER_ID


class UtilTestCase(APITestCase):
    """Class contain all date need to test"""
    def setUp(self):
        """Initializer data for testing"""
        # create and saved to DB
        self.post_obj = PostFactory()
        self.user_obj = UserFactory()
        self.profile_obj = ProfileFactory()
        self.category_obj = CategoryFactory()
        self.comment_obj = CommentFactory()
        self.like_obj = LikeFactory()
        self.photo_obj = PhotoFactory()
        self.friend_obj = FriendFactory()

        # mock data - do manually
        # Know issue from factoryboy:
        # https://github.com/FactoryBoy/factory_boy/issues/68
        self.post_data = {
            'content': self.post_obj.content,
            'title': self.post_obj.title,
            'category_name': self.category_obj.name,
            'photo_id': self.post_obj.id,
        }
        self.user_data = {
            'username': self.user_obj.username + str(
                datetime.now().timestamp()),
            'first_name': self.user_obj.first_name,
            'last_name': self.user_obj.last_name,
            'email': self.user_obj.email,
            'password': 'asnet@123',
            'profile': {
                'address': self.profile_obj.address,
                'phone': '+84763651191',
                'avatar': None,
            }
        }
        self.comment_data = {
            'post_id': self.comment_obj.post.id,
            'content': self.comment_obj.content,
            'photo_id': self.comment_obj.id,
        }
        self.category_data = {
            'name': self.category_obj.name,
            'icon': self.category_obj.icon.id
        }
        self.category_drf_data = {
            'name': self.category_obj.name,
            'photo_id': self.category_obj.icon.id
        }
        self.like_data = {
            'post_id': self.like_obj.post.id,
            'is_like': False
        }
        self.photo_data = {
            'origin': self.photo_obj.origin,
        }

    def random_time_str(self):
        """Helper render a time string"""
        return str(datetime.now().timestamp())

    def view_action_url(self, base_view, action, pk):
        """Util function help create instance url

        :param: base_view - name base view
        :param: action - detail action of instance
        :param: pk - id of instance
        :return: url
        """
        return reverse('%s-%s' % (base_view, action),
                       kwargs={'pk': pk})

    def view_list_url(self, base_view):
        """Util function help create list url

        :param: base_view - name base view
        :return: url
        """
        return reverse('%s-list' % base_view)

    # Util for models
    def get_str_correct(self, model_instance, expect_str):
        """Ensure object display right string

        :param: model_instance - instance of model
        :param: expect_str - result expected
        """
        self.assertEqual(str(model_instance), expect_str)


class UtilFunctions():
    """Util function general"""
    def id_require_integer(self, s):
        """Check string is interger

        :param: s(string)
        :return: boolean
        """
        try:
            int(s)
            return True
        except ValueError:
            raise ValidationError(REQUIRED_INTEGER_ID)

    def multi_serializer_data(self, serializer_class, request, filter_result):
        """Multi serializer data, validate, save and return Response obj

        :param: serializer_class - serializer class
        :param: request - Request obj
        :param: filter_result - queryset

        :return Response obj with status 200 and serializer data
        """
        serializer = serializer_class(
            filter_result,
            many=True,
            context={'request': request}
        )
        return Response(serializer.data, status.HTTP_200_OK)

    def serialize_validate_and_save(self, serializer_class, data):
        """Serializer datat, validate and save

        :param: serializer_class - serializer class
        :return: serializer result
        """
        serializer = serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return serializer

    def human_time(self, time_obj):
        """Format time to m:d:y, h:m:s

        :param: time_obj - datime obj
        :return: string format `05/28/2019, 03:33:56`
        """
        return time_obj.strftime('%m/%d/%Y, %H:%M:%S')

    def replace_value_dict(self, origin, update):
        """Help update value of dict

        :param: origin - old dict
        :param: update - dict update data
        """
        for attr, value in update.items():
            setattr(origin, attr, value)

        return origin
