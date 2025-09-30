from social_api.commons.utils import UtilTestCase
# from social_api.user.models import User, Friend, Profile
# from social_api.user.factories import UserFactory, FriendFactory
# from social_api.user.factories import ProfileFactory


class UserTestCase(UtilTestCase):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_user_instance_display(self):
        """Ensure user instance display correct"""
        self.get_str_correct(self.user_obj, self.user_obj.username)

    # Coverage still the same when comment these test
    # I think APIs already go through it
    # not use anymore - still keep for future using
    # def test_create_user(self):
    #     """Ensure can create user"""
    #     self.create_instance_correct(User, UserFactory)

    # def test_update_user(self):
    #     """Ensure can update user"""
    #     pass

    # def test_get_user_instance(self):
    #     """Ensure data ofobeof user  get correct"""
    #     pass

    # def test_delete_user(self):
    #     """Ensure can delete user"""
    #     self.delete_instance_correct(User, self.user_obj.id)


class FriendTestCase(UtilTestCase):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_friend_instance_display(self):
        """Ensure friend instance display correct"""
        self.get_str_correct(
            self.friend_obj,
            '%d from user #%s to user #%s' % (
                self.friend_obj.id, self.friend_obj.from_user_id,
                self.friend_obj.to_user_id))

    # Coverage still the same when comment these test
    # I think APIs already go through it
    # not use anymore - still keep for future using
    # def test_create_friend(self):
    #     """Ensure can create friend"""
    #     self.create_instance_correct(Friend, FriendFactory)

    # def test_update_friend(self):
    #     """Ensure can update friend"""
    #     pass

    # def test_get_friend_instance(self):
    #     """Ensure data ofobeof friend  get correct"""
    #     pass

    # def test_delete_friend(self):
    #     """Ensure can delete friend"""
    #     self.delete_instance_correct(Friend, self.friend_obj.id)


class ProfileTestCase(UtilTestCase):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_profile_instance_display(self):
        """Ensure profile instance display correct"""
        self.get_str_correct(self.profile_obj, self.profile_obj.user.username)

    # def test_create_profile(self):
    #     """Ensure can create profile"""
    #     self.create_instance_correct(Profile, ProfileFactory)

    # def test_update_profile(self):
    #     """Ensure can update profile"""
    #     pass

    # def test_get_profile_instance(self):
    #     """Ensure data ofobeof profile  get correct"""
    #     pass

    # def test_delete_profile(self):
    #     """Ensure can delete profile"""
    #     self.delete_instance_correct(Profile, self.profile_obj.id)
