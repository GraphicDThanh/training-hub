from social_api.core.tests.test_core import TestBaseAPI

from social_api.post.models import Like


class TestLikeListView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_get_list_like(self):
        """Authorized user can get like list"""
        self.get_list_success(self.url_likes, Like.objects.count())

    def test_unauthorized_user_get_like(self):
        """Unauthorization user can not access like apis"""
        self.log_out()
        self.get_data_forbidden(self.url_likes)

    def test_user_can_create_new_like(self):
        """Ensure authorized user can create new like"""
        self.create_item_success(self.url_likes, self.like_data)

    def test_unauthorized_user_cannot_create_like(self):
        """Ensure unauthorized user cannot create new like"""
        self.log_out()
        self.create_item_forbidden(self.url_likes, {})


class TestLikeDetailView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()
        self.like_data['is_like'] = True

    def test_get_like_instance(self):
        """Authorized user can get like instance"""
        self.get_instance_success(self.url_like)

    def test_unauthorization_get_like_instance(self):
        """Unauthorization user can not can get like instance"""
        self.log_out()
        self.get_data_forbidden(self.url_like)

    def test_update_like_by_admin(self):
        """Only super user or owner can update like"""
        self.create_user_and_log_in(True)  # Login as super user
        self.update_item_success(self.url_like, self.like_data)

    def test_update_like_by_owner(self):
        """Only super user or owner can update like"""
        self.log_in(self.like_obj.owner)  # Login as owner
        self.update_item_success(self.url_like, self.like_data)

    def test_update_like_case_string_by_owner(self):
        """Update like with case is_like is string true"""
        self.create_user_and_log_in(True)  # Login as owner
        self.like_data['is_like'] = 'true'
        self.update_item_success(self.url_like, self.like_data)

    def test_update_like_forbidden_with_unauthorized_user(self):
        """Unauthorized user cannot update like"""
        self.log_out()
        self.update_item_forbidden(self.url_like, self.like_data)

    def test_update_like_forbidden_with_normal_user(self):
        """Not owner user cannot update like"""
        self.create_user_and_log_in()
        self.update_item_forbidden(self.url_like, self.like_data)

    def test_delete_like_with_admin(self):
        """Only super user or owner can delete like"""
        self.create_user_and_log_in(True)  # Login as super user
        self.delete_item_success(self.url_like)

    def test_delete_like_with_owner(self):
        """Only super user or owner can delete like"""
        self.log_in(self.like_obj.owner)  # Login as owner
        self.delete_item_success(self.url_like)

    def test_delete_like_forbidden_with_unauthorized_user(self):
        """Unauthorized cannot delete like"""
        self.delete_item_forbidden(self.url_like)

    def test_delete_like_forbidden(self):
        """Normal user(not owner) cannot delete like"""
        self.delete_item_forbidden(self.url_like)
