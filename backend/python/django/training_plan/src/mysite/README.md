# My first app Django from [tutorial](https://docs.djangoproject.com/en/2.1/intro/tutorial01/)

### Run app
python manage.py runserver

#### localhost:8000/polls to see `polls/` app

#### localhost:8000/admin to access admin page with account
>
> username: thanhnguyen
>
> password: abcABC@123

### Theory note
#### Model

* Steps to use model

   * Step 1: add model to `models.py`
   * Step 2: use model by add new apps to `INSTALLED_APPS` array
   * Step 3: migrate it by run: `python3 manage.py migrate` or `python3 manage.py makemigrations` by first time
