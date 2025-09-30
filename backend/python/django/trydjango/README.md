Do this project follow [this tutorial](https://www.youtube.com/watch?v=F5mRW0jo-U4)

Python: Python 3.7.2(Python 2.7.15)
Django version: 2.0.7

## Step 1: Setup environment
- `virtualenv -p python3 .`

## Active virtual env for working
- `source bin/activate`

- Deactive by `deactivate`

## Install Django version 2.0.7 in env
- `pip install django==2.0.7`

**Note**:
- Check version using by `pip freeze`

## Step 2: Create django project and migrate with db
- Make source folder: `mkdir src & cd src`
- Create project: `django-admin createproject tryjango`
- Go project folder: `cd tryjango/`
- Run server: `python3 manage.py runserver`
- Migrate db with project `python3 manage.py migrate`

## Step 3: Create super user
- Create super user: `python3 manage.py createsuperuser`
>
> My super account: `admin/abcABC@123`
>
- We can log in to admin page by above account


* Some other notes:
- Root django project: `where have manage.py` file

## Step 4: Start an app
- Create an app: `python3 manage.py startapp products`

### Update models & migrate it - EVERY TIME CHANGE MODEL - SUPER IMPORTANT!!!
- Make a model in `models.py` of app
- Run `python3 manage.py makemigrations`
- Run `python3 manage.py migrate`

### Update model data to admin page of app by
- Go `admin.py` of app
- import models by: `from .models import Products`
- Add `admin.site.register(Products)`
