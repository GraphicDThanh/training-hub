
* Note down way to setup project temporary

* Step 1: Setup env for working
    > Version note:
    >
    > Python 3.7.2
    >
    > Django==2.1.7
    >

* Step 1.1: init virtualenv
    ```
    virtualenv -p python3 .
    ```

* Step 1.2: Go to env
    ```
    source bin/activate
    ```

* Step 1.3: Install Django
    ```
    pip install django
    ```

* Exit env by `deactivate`


* Step 2: Start new project for django

    ```
    cd src/
    django-admin startproject official_docs
    ```

* Step 3: Create app in project
    ```
    python3 manage.py startapp examples
    ```

* Step 4: Add code for app
    - Views
    - Urls setting
    - Run app by: `python3 manage.py runserver`

* Step 5: Add and migrate model
    - Add models code
    - Activate model by add config app `examples.apps.ExamplesConfig` to `INSTALLED_APPS`
    - Run `python3 manage.py makemigrations examples` to create migrations for those changes
    - Run `python3 manage.py migrate` to apply those changes to the database.

* Step 6: Play with API
    ```
    python3 manage.py shell
    ```
