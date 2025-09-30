from social_api.commons.utils import UtilTestCase


class PhotoTestCase(UtilTestCase):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_photo_instance_display(self):
        """Ensure photo instance display correct"""
        self.get_str_correct(self.photo_obj, '%d' % self.photo_obj.id)

    # Coverage still the same when comment these test
    # I think APIs already go through it
    # not use anymore - still keep for future using
    # def test_create_photo(self):
    #     """Ensure can create photo"""
    #     self.create_instance_correct(Photo, PhotoFactory)

    # def test_update_photo(self):
    #     """Ensure can update photo"""
    #     photo = PhotoFactory()
    #     photo_new = PhotoFactory()
    #     photo.origin = photo_new.origin
    #     photo.save()

    #     self.assertEqual(photo.origin, photo_new.origin)

    # def test_get_photo_instance(self):
    #     """Ensure data of photo  get correct"""
    #     photo = Photo.objects.get(pk=self.photo_obj.id)
    #     self.assertEqual(photo.origin, self.photo_data['origin'])

    # def test_delete_photo(self):
    #     """Ensure can delete photo"""
    #     self.delete_instance_correct(Photo, self.photo_obj.id)
