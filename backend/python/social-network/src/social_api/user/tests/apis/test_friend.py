from django.core import mail

from social_api.commons.constants import (REQUIRE_TO_USER, ERROR_FRIEND_EXIST,
                                          ERROR_FRIEND_THEMSELVES)
from social_api.core.tests.test_core import TestBaseAPI
from social_api.core.exceptions import ValidationError, AlreadyExistError
from social_api.user.models import Friend
from social_api.user.serializers import FriendSerializer


class TestFriendshipListView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    # GET APIS
    def test_get_list_friendship(self):
        """Authorized user can get friend list"""
        self.get_list_success(self.url_friends, Friend.objects.count())

    def test_unauthorization_get_friendship(self):
        """Unauthorization user can not can get friend list"""
        self.log_out()
        self.get_data_forbidden(self.url_friends)

    # CREATE APIS
    def test_user_can_create_friend_request(self):
        """User can request to be a friend with others"""
        self.create_item_success(self.url_friends, self.friend_data)

    def test_create_friend_request_with_to_username(self):
        """User can request to be a friend with others"""
        self.create_item_success(self.url_friends, {
            'to_username': self.not_current_log_in_username
        })

    def test_create_friend_request_missing_data(self):
        """User create friend missing data to_user/to_username raise error"""
        # self.create_item(self.url_friends, {})
        with self.assertRaisesRegexp(ValidationError,
                                     REQUIRE_TO_USER):
            self.create_item(self.url_friends, {})

    def test_raise_error_request_themselves(self):
        """User cannot create request friend with them selves"""
        self.friend_data['to_user'] = self.user.id

        with self.assertRaisesRegexp(ValidationError, ERROR_FRIEND_THEMSELVES):
            self.create_item(self.url_friends, self.friend_data)

    def test_raise_error_if_friend_exist_case_from_user(self):
        """User cannot create request to friend if that friendship exist"""
        self.create_item(self.url_friends, self.friend_data)

        with self.assertRaisesRegexp(AlreadyExistError, ERROR_FRIEND_EXIST):
            self.create_item(self.url_friends, self.friend_data)

    def test_raise_error_if_friend_exist_case_to_user(self):
        """User cannot create request to friend if that friendship exist"""
        current_user_id = self.user.id
        self._create_friend_then_log_as_target_user()

        with self.assertRaisesRegexp(AlreadyExistError, ERROR_FRIEND_EXIST):
            self._create_friend_ship(current_user_id)

    def test_send_email_request_after_create_friendship(self):
        """An email should send if a friend request create success"""
        old_mail_outbox = len(mail.outbox)
        self.create_item(self.url_friends, self.friend_data)
        self.assertEqual(len(mail.outbox), old_mail_outbox + 1)


class TestFriendshipDetailView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    # GET APIS
    def test_get_friend_instance(self):
        """Authorized user can get friend instance"""
        friendship_data = self._create_friend_ship()
        self.get_instance_success(friendship_data['url_friend'])

    def test_unauthorization_get_friend_instance(self):
        """Unauthorization user can not can get friend instance"""
        friendship_data = self._create_friend_ship()
        self.log_out()
        self.get_data_forbidden(friendship_data['url_friend'])

    # ACCEPT
    def test_to_user_of_friendship_accept_friend_request(self):
        """to_user of friendshi  can accept friend request"""
        # create friendship request then switch to log in as target user
        friendship_data = self._create_friend_then_log_as_target_user()
        self.post_data_success(friendship_data['url_friend_accept'], None)

    def test_from_user_of_friendship_accept_friend_request(self):
        """from_user of friendship can not accept friend request"""
        # create friendship request then switch to log in as target user
        friendship_data = self._create_friend_ship()
        self.post_data_forbidden(friendship_data['url_friend_accept'], None)

    def test_admin_accept_friend(self):
        """Admin can accept friend request"""
        # create friendship request then switch to log in as target user
        friendship_data = self._create_friend_then_log_as_target_user()
        self.create_user_and_log_in(True)
        self.post_data_success(friendship_data['url_friend_accept'], {})

    # REJECT
    def test_to_user_of_friendship_reject_friend(self):
        """to_user of friendship can reject friend request"""
        friendship_data = self._create_friend_then_log_as_target_user()
        self.post_data_success(friendship_data['url_friend_reject'], {})

    def test_from_user_of_friendship_reject_friend(self):
        """from_user of friendship can not reject friend request"""
        friendship_data = self._create_friend_ship()
        self.post_data_forbidden(friendship_data['url_friend_reject'], {})

    def test_admin_reject_friend(self):
        """Admin can reject any request"""
        friendship_data = self._create_friend_then_log_as_target_user()
        self.post_data_success(friendship_data['url_friend_reject'], {})

    # DELETE
    def test_delete_friendship_by_from_user_of_friendship(self):
        """From user can delete a friendship"""
        friendship_data = self._create_friend_ship()
        self.delete_item_success(friendship_data['url_friend'])

    def test_delete_friendship_by_admin_user(self):
        """Admin can delete a friendship"""
        friendship_data = self._create_friend_ship()
        self.create_user_and_log_in(True)
        self.delete_item_success(friendship_data['url_friend'])

    def test_delete_friendship_forbiden_by_normal_user(self):
        """Normal user cannot delete a friendship"""
        friendship_data = self._create_friend_ship()
        self.create_user_and_log_in()
        self.delete_item_forbidden(friendship_data['url_friend'])

    def test_delete_friendship_forbiden_by_target_user_of_friendship(self):
        """Target user cannot delete a friendship"""
        friendship_data = self._create_friend_then_log_as_target_user()
        self.delete_item_forbidden(friendship_data['url_friend'])

    # OTHER CASE
    def test_get_friend_of_user(self):
        """Authenticated user can see friend of specific user"""
        expected_friends = 2
        current_user_id = self.user.id
        # Step 1: Current user create friendship and
        # target user accept it (1 friend added)
        self._create_friends_and_accept_request()

        # Another user create friendship to current user and
        # current user accept it (1 friend added)
        self.create_user_and_log_in()
        self._create_friends_and_accept_request(current_user_id)

        url_friends = self.view_action_url(
            'user', 'friends', current_user_id)

        self.get_list_success(url_friends, expected_friends)

    def test_duplicate_status_update_cause_error(self):
        """Cannot update friendship with same exist status"""
        friendship_data = self._create_friends_and_accept_request(
            self.not_current_log_in_user_id)

        with self.assertRaises(AlreadyExistError):
            self.post_data_request(friendship_data['url_friend_accept'], {})

    def test_forbidden_update_friendship(self):
        friendship_data = self._create_friend_ship()
        self.update_item_forbidden(friendship_data['url_friend_accept'], {})


class TestFriendSerializer(TestBaseAPI):
    def test_friend_serializer_case_missing_data(self):
        with self.assertRaisesRegexp(ValidationError,
                                     REQUIRE_TO_USER):
            serializer = FriendSerializer(data={})
            serializer.is_valid(raise_exception=True)
