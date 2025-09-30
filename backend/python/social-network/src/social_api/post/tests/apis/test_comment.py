from social_api.core.tests.test_core import TestBaseAPI

from social_api.post.models import Comment


class TestCommentListView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_get_list_comment(self):
        """Authorized user can get comment list"""
        self.get_list_success(self.url_comments, Comment.objects.count())

    def test_unauthorized_user_get_comment(self):
        """Unauthorization user can not access comment apis"""
        self.log_out()
        self.get_data_forbidden(self.url_comments)

    def test_user_can_create_new_comment(self):
        """Ensure authorized user can create new comment"""
        self.create_item_success(self.url_comments, self.comment_data)

    def test_unauthorized_user_cannot_create_comment(self):
        """Ensure unauthorized user cannot create new comment"""
        self.log_out()
        self.create_item_forbidden(self.url_comments, {})


class TestCommentDetailView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_get_comment_instance(self):
        """Authorized user can get comment instance"""
        self.get_instance_success(self.url_comment)

    def test_unauthorization_get_comment_instance(self):
        """Unauthorization user can not can get comment instance"""
        self.log_out()
        self.get_data_forbidden(self.url_comment)

    def test_update_comment_by_admin(self):
        """Only super user or owner can update comment"""
        self.create_user_and_log_in(True)  # Login as super user
        self.update_item_success(self.url_comment, self.comment_data)

    def test_update_comment_by_owner(self):
        """Only super user or owner can update comment"""
        self.log_in(self.comment_obj.owner)  # Login as owner
        self.update_item_success(self.url_comment, self.comment_data)

    def test_update_comment_forbidden_with_unauthorized_user(self):
        """Unauthorized user cannot update comment"""
        self.log_out()
        self.update_item_forbidden(self.url_comment, self.comment_data)

    def test_update_comment_forbidden_with_normal_user(self):
        """Not owner user cannot update comment"""
        self.create_user_and_log_in()
        self.update_item_forbidden(self.url_comment, self.comment_data)

    def test_delete_comment_with_admin(self):
        """Only super user or owner can delete comment"""
        self.create_user_and_log_in(True)  # Login as super user
        self.delete_item_success(self.url_comment)

    def test_delete_comment_with_owner(self):
        """Only super user or owner can delete comment"""
        self.log_in(self.comment_obj.owner)  # Login as owner
        self.delete_item_success(self.url_comment)

    def test_delete_comment_forbidden_with_unauthorized_user(self):
        """Unauthorized cannot delete comment"""
        self.delete_item_forbidden(self.url_comment)

    def test_delete_comment_forbidden(self):
        """Normal user(not owner) cannot delete comment"""
        self.delete_item_forbidden(self.url_comment)
