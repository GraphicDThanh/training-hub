import os
from distutils.util import strtobool
from configurations import Configuration
BASE_DIR = os.path.abspath(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))) + '/../')


class Common(Configuration):

    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'django.contrib.sites',

        # Third party apps
        'rest_framework',  # utilities for rest api
        'rest_framework.authtoken',  # token authentication
        'rest_auth',
        'allauth',
        'allauth.account',
        'allauth.socialaccount',
        'rest_auth.registration',
        'django_extensions',
        'django_filters',  # for filter rest endpoint
        'phonenumber_field',
        'django_nose',
        'imagekit',
        'rest_framework_swagger',

        # Local apps
        'social_api.commons',
        'social_api.core',
        'social_api.user.apps.UserConfig',
        'social_api.post.apps.PostConfig',
        'social_api.category.apps.CategoryConfig',
    )

    MIDDLEWARE = (
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
        'social_api.commons.middleware.QueryCountDebugMiddleware',
    )

    ALLOWED_HOSTS = ['*']
    ROOT_URLCONF = 'config.urls'
    SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')
    WSGI_APPLICATION = 'config.wsgi.application'

    # Email
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

    SITE_ID = 1

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

    # General
    # APPEND_SLASH = False
    TIME_ZONE = 'UTC'
    LANGUAGE_CODE = 'en-us'
    # If you set this to False, Django will make some optimizations so as not
    # to load the internationalization machinery.
    USE_I18N = False
    USE_L10N = False
    USE_TZ = True
    LOGIN_REDIRECT_URL = '/'

    # Static files(CSS, Javascript, Images)
    # https://docs.djangoproject.com/en/2.0/howto/static-files/
    STATIC_ROOT = './static/'

    STATICFILES_DIRS = []
    STATIC_URL = '/static/'
    STATICFILES_FINDERS = (
        'django.contrib.staticfiles.finders.FileSystemFinder',
        'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    )

    # Media files
    # MEDIA_ROOT = join(os.path.dirname(BASE_DIR), 'media')
    MEDIA_ROOT = './media/'
    MEDIA_URL = '/media/'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': STATICFILES_DIRS,
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    # Set DEBUG to False as a default for safety
    # https://docs.djangoproject.com/en/dev/ref/settings/#debug
    DEBUG = strtobool(os.getenv('DJANGO_DEBUG', 'no'))

    pasword_validate_path = 'django.contrib.auth.password_validation.'
    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': pasword_validate_path + 'UserAttributeSimilarityValidator',
        },
        {
            'NAME': pasword_validate_path + 'MinimumLengthValidator',
        },
        {
            'NAME': pasword_validate_path + 'CommonPasswordValidator',
        },
        {
            'NAME': pasword_validate_path + 'NumericPasswordValidator',
        },
    ]

    # Django Rest Framework
    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
        ],
        'TEST_REQUEST_DEFAULT_FORMAT': 'json',
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework.authentication.SessionAuthentication',
            'rest_framework.authentication.BasicAuthentication',
            'rest_framework.authentication.TokenAuthentication',
        ],
        'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
        'PAGE_SIZE': 5,
    }

    TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

    NOSE_ARGS = [
        '--cover-erase',
        # issue https://github.com/django-nose/django-nose/issues/180
        # not include model in coverage with django-nose
        # fix by code in manage.py
        # '--with-coverage',
        '--cover-package=social_api'
    ]

    SHELL_PLUS_PRE_IMPORTS = [
        ('social_api.core.serializers', '*'),
        ('social_api.post.serializers', '*'),
        ('social_api.categoryserializers', '*'),
    ]

    MEDIA_ROOT_DEBUG = os.path.join(MEDIA_ROOT, 'debug')

    SWAGGER_SETTINGS = {
        'LOGIN_URL': 'rest_framework:login',
        'LOGOUT_URL': 'rest_framework:logout',
    }

    # Celery settings
    CELERY_BROKER_URL = 'redis://localhost:6379/'
    CELERY_RESULT_BACKEND = 'redis://localhost:6379/'

    # Akismet filter spam comment
    AKISMET_KEY = '626c54573958'

