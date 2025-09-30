#!/bin/sh
python manage.py migrate
gunicorn dj_project.wsgi
# python manage.py runserver 0.0.0.0:8000
