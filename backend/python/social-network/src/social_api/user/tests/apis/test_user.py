from social_api.core.tests.test_core import TestBaseAPI
from social_api.user.models import Profile


class TestUserListView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_get_list_user(self):
        """Authorized user can get user list"""
        self.get_list_success(self.url_users, Profile.objects.count())

    def test_unauthorization_get_user(self):
        """Unauthorization user can not access user apis"""
        self.log_out()
        self.get_data_forbidden(self.url_users)

    def test_only_super_user_can_create_new_user(self):
        """Ensure only super can create a user"""
        self.create_user_and_log_in(True)  # Login as super user
        self.create_item_success(self.url_users, self.user_data)

    def test_create_user_forbidden_with_normal_user(self):
        """Normal user cannot create new user"""
        self.create_item_forbidden(self.url_users, self.user_data)

    def test_create_new_user_create_new_user_profile(self):
        """Ensure when create user will auto create profile"""
        self.create_user_and_log_in(True)  # Login as super user
        old_count_profile = Profile.objects.count()

        # create new user with super user permission
        response = self.client.post(self.url_users, self.user_data)

        new_count_profile = Profile.objects.count()
        user_profile_created = Profile.objects.get(
            user__id=response.data['id'])

        # test profile auto create by count
        self.assertEqual(old_count_profile + 1, new_count_profile)

        # test value of profile create equal value of user
        for value in self.user_data:
            if value not in ['password', 'profile']:
                self.assertEqual(
                    getattr(user_profile_created.user, value),
                    response.data[value])


class TestUserDetailView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_get_user_instance(self):
        """Authorized user can get user instance"""
        self.get_instance_success(self.url_user)

    def test_unauthorization_get_user_instance(self):
        """Unauthorization user can not can get user instance"""
        self.log_out()
        self.get_data_forbidden(self.url_user)

    def test_update_user_by_admin(self):
        """Only super user can update user"""
        self.create_user_and_log_in(True)  # Login as super user
        self.update_item_success(self.url_user, self.user_data)

    def test_update_user_by_owner(self):
        """Only super user can update user"""
        self.update_item_success(self.url_user, self.user_data)

    def test_update_user_forbidden_with_unauthorized_user(self):
        """Unauthorized user cannot update user"""
        self.log_out()
        self.update_item_forbidden(self.url_user, self.user_data)

    def test_update_user_forbidden_with_normal_user(self):
        """Normal user cannot update user"""
        self.create_user_and_log_in()
        self.update_item_forbidden(self.url_user, self.user_data)

    def test_delete_user(self):
        """Only super user can delete user"""
        self.create_user_and_log_in(True)  # Login as super user
        self.delete_item_success(self.url_user)

    def test_delete_user_forbidden_with_unauthorized_user(self):
        """Unauthorized cannot delete user"""
        self.delete_item_forbidden(self.url_user)

    def test_delete_user_forbidden(self):
        """Normal user cannot delete user"""
        self.delete_item_forbidden(self.url_user)

    # DATA AGGREGATION
    def test_total_post_of_user(self):
        """User can see total comment of user"""
        expect_posts = 5
        for i in range(0, expect_posts):
            self.create_item(self.url_posts, self.post_data)

        self.assertEqual(
            len(self.get_data(self.url_user_posts).data),
            expect_posts)

    def test_total_comment_of_user(self):
        """User can see total comment of user"""
        expect_comments = 5
        for i in range(0, expect_comments):
            self.create_item(self.url_comments, self.comment_data)

        self.assertEqual(
            len(self.get_data(self.url_user_comments).data),
            expect_comments)

    # NOT FINISH IN CODE
    # def test_total_friend_of_user(self):
    #     """Total friend of user should show on instance"""
    #     pass

    # EXTRA ACTIONS
    def test_get_list_comments_of_user(self):
        """Authorized user can get list comments of user instance"""
        self.get_instance_success(self.url_user_comments)

    def test_get_list_post_of_user(self):
        """Authorized user can get list comments of user instance"""
        self.get_instance_success(self.url_user_posts)

    def test_get_list_like_of_user(self):
        """Authorized user can get list like of user instance"""
        self.get_instance_success(self.url_user_likes)

    def test_get_list_friend_of_user(self):
        """Authorized user can get list friends of user instance"""
        self.get_instance_success(self.url_user_friends)
