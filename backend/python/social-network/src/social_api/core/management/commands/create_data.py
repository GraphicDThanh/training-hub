from django.core.management.base import BaseCommand

from social_api.user.factories import FriendFactory
from social_api.post.factories import CommentFactory, LikeFactory


class Command(BaseCommand):
    help = 'Create data for testing social_api'

    def handle(self, *args, **options):
        total = 3
        for i in range(total):
            if i % 2 == 0:
                FriendFactory(status=1)
            elif i % 3 == 0:
                FriendFactory(status=2)
            else:
                FriendFactory(status=0)

            CommentFactory()
            LikeFactory()

        self.stdout.write(
            self.style.SUCCESS('Successfully create example data'))
