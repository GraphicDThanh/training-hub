from social_api.commons.utils import UtilTestCase
# from social_api.core.models import Photo
# from social_api.category.models import Category
# from social_api.category.factories import CategoryFactory
# from social_api.post.factories import PostFactory


class CategoryTestCase(UtilTestCase):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_category_instance_display(self):
        """Ensure category instance display correct"""
        self.get_str_correct(self.category_obj, self.category_obj.name)

    # Coverage still the same when comment these test
    # I think APIs already go through it
    # not use anymore - still keep for future using
    # def test_create_category(self):
    #     """Ensure can create category"""
    #     self.create_instance_correct(Category, CategoryFactory)

    # def test_update_category(self):
    #     """Ensure can update category"""
    #     category = CategoryFactory()

    #     update_name = self._make_unique_string(category.name)
    #     update_icon = self.photo_obj

    #     category.name = update_name
    #     category.icon = update_icon
    #     category.save()

    #     self.assertEqual(category.name, update_name)
    #     self.assertEqual(category.icon.id, update_icon.id)

    # def test_get_category_instance(self):
    #     """Ensure data of categpry get correct"""
    #     category = Category.objects.get(pk=self.category_obj.id)

    #     self.assertEqual(category.name, self.category_data['name'])
    #     self.assertEqual(category.icon.id, self.category_data['icon'])

    # def test_delete_category(self):
    #     """Ensure can delete instance"""
    #     self.delete_instance_correct(Category, self.category_obj.id)
