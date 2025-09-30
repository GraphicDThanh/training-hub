from social_api.core.tests.test_core import TestBaseAPI
from social_api.post.models import Post


class TestPostListView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    # GET
    def test_get_list_post(self):
        """Authorized user can get post list"""
        self.get_list_success(self.url_posts, Post.objects.count())

    def test_unauthorized_user_get_post(self):
        """Unauthorization user can not access post apis"""
        self.log_out()
        self.get_data_forbidden(self.url_posts)

    # CREATE
    def test_user_can_create_new_post(self):
        """Ensure authorized user can create new post"""
        self.create_item_success(self.url_posts, self.post_data)

    def test_unauthorized_user_cannot_create_post(self):
        """Ensure unauthorized user cannot create new post"""
        self.log_out()
        self.create_item_forbidden(self.url_posts, {})


class TestPostDetailView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    # GET
    def test_get_post_instance(self):
        """Authorized user can get post instance"""
        self.get_instance_success(self.url_post)

    def test_unauthorization_get_post_instance(self):
        """Unauthorization user can not can get post instance"""
        self.log_out()
        self.get_data_forbidden(self.url_post)

    # UPDATE
    def test_update_post_by_admin(self):
        """Only super user or owner can update post"""
        self.create_user_and_log_in(True)  # Login as super user
        self.update_item_success(self.url_post, self.post_data)

    def test_update_post_by_owner(self):
        """Only super user or owner can update post"""
        self.log_in(self.post_obj.owner)  # Login as owner
        self.update_item_success(self.url_post, self.post_data)

    def test_update_post_forbidden_with_unauthorized_user(self):
        """Unauthorized user cannot update post"""
        self.log_out()
        self.update_item_forbidden(self.url_post, self.post_data)

    def test_update_post_forbidden_with_normal_user(self):
        """Not owner user cannot update post"""
        self.create_user_and_log_in()
        self.update_item_forbidden(self.url_post, self.post_data)

    # DELETE
    def test_delete_post_with_admin(self):
        """Only super user or owner can delete post"""
        self.create_user_and_log_in(True)  # Login as super user
        self.delete_item_success(self.url_post)

    def test_delete_post_with_owner(self):
        """Only super user or owner can delete post"""
        self.log_in(self.post_obj.owner)  # Login as owner
        self.delete_item_success(self.url_post)

    def test_delete_post_forbidden_with_unauthorized_user(self):
        """Unauthorized cannot delete post"""
        self.delete_item_forbidden(self.url_post)

    def test_delete_post_forbidden(self):
        """Normal user(not owner) cannot delete post"""
        self.delete_item_forbidden(self.url_post)

    # DATA AGGREGATION
    def test_total_comment_of_post(self):
        """User can see total comment of post"""
        expect_comment = 3

        # Create post
        post_util = self.create_post_return_id_and_url()
        # Create comment
        self.create_comments_for_post(post_util['post_id'], expect_comment)

        # get post _create_comment_for_post and check total comment
        self.assertEqual(
            self.get_data(post_util['url']).data['total_comment'],
            expect_comment)

    def test_total_like_of_post(self):
        """User can see total like of post"""
        expect_like = 3
        # Create post
        post_util = self.create_post_return_id_and_url()
        # Create like
        self.create_likes_for_post(post_util['post_id'], expect_like)

        # get post _create_comment_for_post and check total comment
        self.assertEqual(
            self.get_data(post_util['url']).data['total_like'],
            expect_like)

    # EXTRA ACTIONS
    def test_get_list_comments_of_post(self):
        """Authorized user can get list comments of post instance"""
        self.get_instance_success(self.url_post_comments)

    def test_get_list_like_of_post(self):
        """Authorized user can get list likes of post instance"""
        self.get_instance_success(self.url_post_likes)

    def test_get_list_user_like_post(self):
        """Authorized user can get list users comment to post instance"""
        self.get_instance_success(self.url_post_users_like)

    def test_get_list_user_comment_post(self):
        """Authorized user can get list users comment to post instance"""
        self.get_instance_success(self.url_post_users_comment)
