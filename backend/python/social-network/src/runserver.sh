#!/bin/sh
# export DJANGO_CONFIGURATION=Local
# export DJANGO_SETTINGS_MODULE=config.settings
# #  store the static files in your STATIC_ROOT
# python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
# gunicorn config.wsgi -b 0.0.0.0:8000
