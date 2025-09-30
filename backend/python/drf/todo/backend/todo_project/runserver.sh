#!/bin/sh
python manage.py migrate
# gunicorn todo_project.wsgi
python manage.py runserver 0.0.0.0:8000
