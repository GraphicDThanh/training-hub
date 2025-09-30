#!/bin/sh
python manage.py migrate
# gunicorn library_project.wsgi
python manage.py runserver 0.0.0.0:8000
