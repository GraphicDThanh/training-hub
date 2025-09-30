from django.apps import AppConfig


class UserConfig(AppConfig):
    name = 'social_api.user'

    def ready(self):
        import social_api.user.signals.handlers
