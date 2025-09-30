from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.reverse import reverse

from social_api.commons.utils import UtilTestCase


class TestBaseAPI(UtilTestCase):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

        # List url
        self.url_users = self.view_list_url('user')
        self.url_posts = self.view_list_url('post')
        self.url_comments = self.view_list_url('comment')
        self.url_friends = self.view_list_url('friend')
        self.url_categories = self.view_list_url('category')
        self.url_likes = self.view_list_url('like')
        self.url_photos = self.view_list_url('photo')

        # Login by default
        self.user = self.create_user_and_log_in()

        # instance url
        self.url_post = self.view_action_url(
            'post', 'detail', self.post_obj.id)
        self.url_user = self.view_action_url('user', 'detail', self.user.id)
        self.url_category = self.view_action_url(
            'category', 'detail', self.category_obj.id)
        self.url_comment = self.view_action_url(
            'comment', 'detail', self.comment_obj.id)
        self.url_like = self.view_action_url(
            'like', 'detail', self.like_obj.id)
        self.url_photo = self.view_action_url(
            'photo', 'detail', self.photo_obj.id)

        # EXTRA ACTIONS URL
        # Post Instance
        self.url_post_comments = self.url_post + 'comments/'
        self.url_post_likes = self.url_post + 'likes/'
        self.url_post_users_like = self.url_post + 'users_like/'
        self.url_post_users_comment = self.url_post + 'users_comment/'
        # User Instance
        self.url_user_comments = self.url_user + 'comments/'
        self.url_user_posts = self.url_user + 'posts/'
        self.url_user_likes = self.url_user + 'likes/'
        self.url_user_friends = self.url_user + 'likes/'
        # Category Instance
        self.url_category_posts = self.url_category + 'posts/'

        self.not_current_login = User.objects.exclude(
            id=self.user.id).first()
        self.not_current_log_in_user_id = self.not_current_login.id

        self.not_current_log_in_username = self.not_current_login.username

        self.friend_data = {
            'to_user': self.not_current_log_in_user_id
        }

    def create_user_and_log_in(self, is_admin=False):
        """
        Authentication by create user then generate token then log in by token

        :param is_admin(Boolean) flag of super user

        :return user(class) class user created
        """
        username = self.user_data['username'] + self.random_time_str()
        first_name = self.user_data['first_name']
        last_name = self.user_data['last_name']
        email = self.user_data['email']

        if is_admin:
            user = User.objects.create_superuser(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=self.user_data['password'],
            )
        else:
            user = User.objects.create(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
            )

        self.log_in(user)
        return user

    def log_in(self, user):
        """
        Create token of user then log in

        :param user User instance
        :return None
        """
        token, _ = Token.objects.get_or_create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def log_out(self):
        """Log user out"""
        self.client.logout()

    def get_data(self, url):
        """Call get data from url

        :param url string

        :return response of request
        """
        return self.client.get(url)

    def post_data_request(self, url, params):
        """Call post data to url with params

        :param url string
        :param paramse data json

        :return response of request
        """
        return self.client.post(url, params)

    def create_item(self, url, params):
        """
        Util function help create new instance by post request with params

        :param url(str): request url
        :param params(dict): data use to create instance

        :return None
        """
        # return self._request(url, params)
        return self.post_data_request(url, params)

    def delete_data(self, url):
        """Call delete data from url

        :param url string

        :return response of request
        """
        return self.client.delete(url)

    def update_data(self, url, params):
        """Call update data to url with params

        :param url string
        :param paramse data json

        :return response of request
        """
        return self.client.put(url, params)

    # GET REQUEST TESTING
    def get_list_success(self, url, expect_length):
        """
        Util function help testing get data with expect length of response:
        - response status 200
        - list response have length equal model manager length

        :param url(str) request url
        :param expect_length(str) length of response expectation

        :return None
        """
        response = self.get_data(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), expect_length)

    def get_instance_success(self, url):
        """
        Util function help testing get data with expect length of response:
        - response status 200
        - list response have length equal model manager length

        :param url(str) request url
        :param class_model(str) class of model related url

        :return None
        """
        response = self.get_data(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def get_data_unauthorized(self, url):
        """
        Util function help testing get data with unauthorized user:
        - response status 401

        :param url(str) request url
        :return None
        """
        response = self.get_data(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def get_data_forbidden(self, url):
        """
        Util function help testing get data without permission:
        - response status 403

        :param url(str) request url
        :return None
        """
        response = self.get_data(url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # POST REQUEST TESTING
    def post_data_success(self, url, params):
        """
        Util function help create new instance by post request with params
        - response status 200

        :param url(str): request url
        :param params(dict): data use to update

        :return None
        """
        response = self.post_data_request(url, params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def post_data_forbidden(self, url, params):
        """
        Util function help create new instance by post request with params
        - response status 403

        :param url(str): request url
        :param params(dict): data use to update

        :return None
        """
        response = self.post_data_request(url, params)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # CREATE REQUEST TESTING
    def create_item_success(self, url, params):
        """
        Util function help testing create new instance
        - response status 201

        :param url(str): request url
        :param params(dict): data use to create user

        :return None
        """
        response = self.create_item(url, params)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def create_item_forbidden(self, url, params):
        """
        Util function help testing create new instance forbidden
        - response status 403

        :param url(str): request url
        :param params(dict): data use to create user

        :return None
        """
        response = self.create_item(url, params)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def create_item_fail(self, url, params):
        """
        Util function help testing create new instance fail
        - response status 400

        :param url(str): request url
        :param params(dict): data use to create user

        :return None
        """
        response = self.create_item(url, params)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # PUT REQUEST TESTING
    def update_item_success(self, url, params):
        """
        Util function help testing update by post request with params
        - response status 200

        :param url(str): request url
        :param params(dict): data

        :return None
        """
        response = self.update_data(url, params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def update_item_fail(self, url, params):
        """
        Util function help testing update by post request with params
        - response status 400

        :param url(str): request url
        :param params(dict): data

        :return None
        """
        response = self.update_data(url, params)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def update_item_forbidden(self, url, params):
        """
        Util function help testing update by post request with params
        - response status 403

        :param url(str): request url
        :param params(dict): data

        :return None
        """
        response = self.update_data(url, params)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # DELETE REQUEST TESTING
    def delete_item_success(self, url):
        """
        Util function help testing delete request
        - response status 204

        :param url(string): request

        :return None
        """
        response = self.delete_data(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def delete_item_forbidden(self, url):
        """
        Util function help testing delete request forbidden
        - response status 403

        :param url(string): request

        :return None
        """
        response = self.delete_data(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # OTHER HELPER IN APIS
    def create_post_return_id_and_url(self):
        """Util function help create a post then return post id"""
        post_response = self.create_item(self.url_posts, self.post_data)
        post_id = post_response.data['id']
        return {
            'post_id': post_id,
            'url': reverse('post-detail', kwargs={'pk': post_id})
        }

    def create_comments_for_post(self, post_id, times=1):
        """
        Util function help create comment for post

        :param post_id id of post
        :param times number of comment(default is 1)
        :return None
        """
        for time in range(0, times):
            self.comment_data['post_id'] = post_id
            self.create_item(self.url_comments, self.comment_data)

    def create_likes_for_post(self, post_id, times=1):
        """
        Util function help create comment for post

        :param post_id id of post
        :param times number of comment(default is 1)
        :return None
        """
        for time in range(0, times):
            self.like_data['post_id'] = post_id
            self.create_item(self.url_likes, self.like_data)

    def _create_friend_ship(self, to_user=None):
        """
        Util function help creat friendship

        :return data dict{
            to_user, url_friend, url_friend_accept, utl_friend_reject}
        """
        if to_user is None:
            to_user = self.not_current_log_in_user_id

        create_friend_resp = self.create_item(
            self.url_friends, {
                'to_user': to_user
            })

        friendship_id = create_friend_resp.data['id']

        url_friend = reverse(
            'friend-detail', kwargs={'pk': friendship_id})
        url_friend_accept = reverse(
            'friend-accept', kwargs={'pk': friendship_id})
        url_friend_reject = reverse(
            'friend-reject', kwargs={'pk': friendship_id})

        return {
            'to_user': create_friend_resp.data['to_user'],
            'url_friend': url_friend,
            'url_friend_accept': url_friend_accept,
            'url_friend_reject': url_friend_reject
        }

    def _create_friend_then_log_as_target_user(self, user_target=None):
        """
        Util function of testing friendship
        - Create friendship
        - Login with target user

        :return data dict{
            to_user, url_friend, url_friend_accept, utl_friend_reject}
        """
        # TODO: create friendship request then switch to log in as target user
        friendship_data = self._create_friend_ship(user_target)
        # STEP 3: log in with user target of above friend request
        target_user = User.objects.get(pk=friendship_data['to_user']['id'])

        self.log_in(target_user)
        return friendship_data

    def _create_friends_and_accept_request(self, user_target=None):
        """Util function help create friendship then accept it"""
        friendship_data = self._create_friend_then_log_as_target_user(
            user_target)
        self.post_data_request(friendship_data['url_friend_accept'], {})
        return friendship_data


# NOTE: Things I will not do test
# - not compare count of objects of model when do action CRUD(DRF do it)
# - not test data detail after Create, Update(DRF do it)
