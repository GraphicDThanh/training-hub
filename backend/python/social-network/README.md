# SOCIAL RESTFUL APIS
> It is big practice about Django + Django REST Framework and Unittest**

* Requirements: [PRACTICE - DJANGO - API - UNITTEST](https://docs.google.com/document/d/1zaj7vE8861hcgg22QUiWob7yrMGNfZXzXWLtfE_AZos/)
* **Timelines**: 4 weeks
* **Resouces**: 1 dev
* **Technique Stack**:
    * Python 3.7.2
    * Django 2.2
    * gunicorn 19.9.0
    * Django Rest Framework 3.9.2
    * Factory Boy 2.11.1
    * Faker 1.0.5
    * Unittest:
        * django-nose 1.4.6
        * coverage 4.5.3
    * Other packages:
        * django-extensions 2.1.6
        * django-configurations 2.1
        * django-allauth 0.39.1
        * phonenumbers 8.10.10
    * Database:
        * SQLite
* **DevOps**
    * Docker
    * gunicorn 19.9.0
* **Practice documents**:
    * [DB Design by dbdiagram](https://dbdiagram.io/d/5cb9241af7c5bb70c72faf4f)
    * [APIs document(in update)](https://docs.google.com/document/d/1GcA_KXxNuVr8zGKdpvYw30TxwTpwKOLAm_w4Aq1dRns/edit?usp=sharing)
    * [Plan working](https://docs.google.com/document/d/1xDg6gGfiOFKP17FJ-7Oi0KtV5J7HoAS29Xfg1f7i8MY/edit?usp=sharing)
    * [Gitlab issues](https://gitlab.asoft-python.com/g-thanhnguyendiem/python-training/issues)

## Development

### Prerequisities
- [Docker](https://docs.docker.com/docker-for-mac/install/)

### Build and run with docker
* Clone code and to work directory: `git clone --single-branch --branch feature/social-api git@gitlab.asoft-python.com:g-thanhnguyendiem/python-training.git && cd python-training/social-network`

* Build docker image `docker-compose build`
* Run `docker-compose up`
* Now, we can access [API Root(http://localhost:8000/ap1/v1/)](http://localhost:8000/ap1/v1/)
* Time to go around with browable API ::heart

### Generata data
* Access to container `web` by: `docker exec -it web bash`
* Create admin user with username: `./manage.py create_admin root2`
* Generate data by custom command: `./manage.py create_data`

### Run test and coverage

* `./manage.py test`

### Some custom `django-admin` commands
* Create admin user(default password is `asnet@123`): `./manage.py create_admin <username>`
* Create data for app: `./manage.py create_data`

## **Thanks for reading**!

> Below is some note for authors only
## Some notes
### Command for working with Docker

    * SSH into container running `docker exec -it <container-name> /bin/bash`

    * Execute command in specific container `docker exec -it <container-name> -c <command>`

    * List all containers `docker ps`

    * List all images `docker images`

    * Delete exist container when run `docker run -rm`

    * Build image by `docker-compose build`

### Order import in development
    1. Django package
    2. drf package
    3. 3rd package
    4. other local package
    5. import from current app

### Code style PEP8 - check by Flake8

### Some note for practice applied
- Structure project follow suggestion from "Two Scoops of Django's book"
- Config setting with django_configurations package
- Use middleware for logging number of query touch to DB
- Use flake8 check code style
- Apply power of shell_plus import
- Apply imagekit
- Custom admin command

### Ref links:
