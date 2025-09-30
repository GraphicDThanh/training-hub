from social_api.commons.utils import UtilTestCase


class PostTestCase(UtilTestCase):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_post_instance_display(self):
        """Ensure post instance display correct"""
        self.get_str_correct(self.post_obj, '#%d %s' % (
            self.post_obj.id, self.post_obj.title))

    # Coverage still the same when comment these test
    # I think APIs already go through it
    # not use anymore - still keep for future using
    # def test_create_post(self):
    #     """Ensure can create post"""
    #     self.create_instance_correct(Post, PostFactory)

    # def test_update_post(self):
    #     """Ensure can update post"""
    #     pass

    # def test_get_post_instance(self):
    #     """Ensure data ofobeof post  get correct"""
    #     pass

    # def test_delete_post(self):
    #     """Ensure can delete post"""
    #     self.delete_instance_correct(Post, self.post_obj.id)


class CommentTestCase(UtilTestCase):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_comment_instance_display(self):
        """Ensure comment instance display correct"""
        self.get_str_correct(self.comment_obj, 'comment #%d of post #%d' % (
            self.comment_obj.id, self.comment_obj.post_id))

    # Coverage still the same when comment these test
    # I think APIs already go through it
    # not use anymore - still keep for future using
    # def test_create_comment(self):
    #     """Ensure can create comment"""
    #     self.create_instance_correct(Comment, CommentFactory)

    # def test_update_comment(self):
    #     """Ensure can update comment"""
    #     pass

    # def test_get_comment_instance(self):
    #     """Ensure data ofobeof comment  get correct"""
    #     pass

    # def test_delete_comment(self):
    #     """Ensure can delete comment"""
    #     self.delete_instance_correct(Comment, self.post_obj.id)


class LikeTestCase(UtilTestCase):
    def setUp(self):
        """Initialize variables and data for test"""
        super().setUp()

    def test_like_instance_display(self):
        """Ensure like instance display correct"""
        self.get_str_correct(self.like_obj, 'from user#%d to #%d' % (
            self.like_obj.owner_id, self.like_obj.post_id))

    # Coverage still the same when comment these test
    # I think APIs already go through it
    # not use anymore - still keep for future using
    # def test_create_like(self):
    #     """Ensure can create like"""
    #     self.create_instance_correct(Like, LikeFactory)

    # def test_update_like(self):
    #     """Ensure can update like"""
    #     pass

    # def test_get_like_instance(self):
    #     """Ensure data ofobeof like  get correct"""
    #     pass

    # def test_delete_like(self):
    #     """Ensure can delete like"""
    #     self.delete_instance_correct(Like, self.like_obj.id)
