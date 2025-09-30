from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Create user admin with username and password default'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username')

    def handle(self, *args, **kwargs):
        username = kwargs['username']

        if not username:
            username = get_random_string()

        User.objects.create_superuser(
            username=username, email='asnet@gmail.com', password='asnet@123')
        self.stdout.write(self.style.SUCCESS(
            'Successfully create super user with password default`asnet@123`'))
