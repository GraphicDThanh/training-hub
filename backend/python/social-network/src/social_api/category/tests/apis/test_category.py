from django.db.utils import IntegrityError
from social_api.category.factories import CategoryFactory
from social_api.core.tests.test_core import TestBaseAPI
from social_api.category.models import Category


class TestCategoryListView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_get_list_category(self):
        """Authorized user can get user list"""
        self.get_list_success(self.url_categories, Category.objects.count())

    def test_unauthorization_get_category(self):
        """Unauthorization user can not access category apis"""
        self.log_out()
        self.get_data_forbidden(self.url_categories)

    def test_only_super_user_can_create_new_category(self):
        """Ensure only super can create a category"""
        self.create_user_and_log_in(True)
        # make unique category name
        self.category_data['name'] += self.random_time_str()
        self.create_item_success(self.url_categories, self.category_data)

    def test_create_category_with_drf_ui(self):
        """User can select id from browable ui"""
        self.create_user_and_log_in(True)
        self.category_drf_data['name'] += self.random_time_str()
        self.create_item_success(self.url_categories, self.category_drf_data)

    def test_create_category_without_icon_with_drf_ui(self):
        """Request without icon will auto select first icon in data"""
        self.create_user_and_log_in(True)
        self.create_item_success(self.url_categories, {
            'name': self.category_obj.name + self.random_time_str()
        })

    def test_unique_category_case_create(self):
        """Ensure only category name is unique"""
        self.create_user_and_log_in(True)
        with self.assertRaises(IntegrityError):
            self.create_item(self.url_categories, self.category_data)

    def test_create_category_forbidden_with_normal_user(self):
        """Normal user cannot create new category"""
        self.create_item_forbidden(self.url_categories, self.category_data)


class TestCategoryDetailView(TestBaseAPI):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_get_category_instance(self):
        """Authorized user can get user instance"""
        self.get_instance_success(self.url_category)

    def test_unauthorization_get_category_instance(self):
        """Unauthorization user can not can get user instance"""
        self.log_out()
        self.get_data_forbidden(self.url_category)

    def test_update_category_by_admin(self):
        """only super user can update category"""
        self.create_user_and_log_in(True)  # Login as super user
        # make unique category name
        self.category_data['name'] += self.random_time_str()
        self.update_item_success(self.url_category, self.category_data)

    def test_unique_category_case_update(self):
        """Ensure only category name is unique"""
        self.create_user_and_log_in(True)
        category_exist = CategoryFactory()
        self.category_data['name'] = category_exist.name
        with self.assertRaises(IntegrityError):
            self.update_data(self.url_category, self.category_data)

    def test_update_category_forbidden_with_unauthorized_user(self):
        """Unauthorized user cannot update category"""
        self.log_out()
        self.update_item_forbidden(self.url_category, {})

    def test_update_category_forbidden_with_normal_user(self):
        """Normal user cannot update category"""
        self.create_user_and_log_in()
        self.update_item_forbidden(self.url_category, {})

    def test_delete_category(self):
        """Only super user can delete category"""
        self.create_user_and_log_in(True)  # Login as super user
        self.delete_item_success(self.url_category)

    def test_delete_category_forbidden_with_unauthorized_user(self):
        """Unauthorized user cannot delete category"""
        self.delete_item_forbidden(self.url_category)

    def test_delete_category_forbidden_with_normal_user(self):
        """Normal user cannot update category"""
        self.delete_item_forbidden(self.url_category)

    # EXTRA ACTIONS
    def test_get_list_posts_of_category(self):
        """Authorized user can get list post of category instance"""
        self.get_instance_success(self.url_category_posts)
