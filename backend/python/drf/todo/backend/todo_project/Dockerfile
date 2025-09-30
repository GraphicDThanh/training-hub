FROM python:3.7.2
ENV PYTHONUNBUFFERED 1
RUN mkdir /code

ADD ./requirements.txt /code/requirements.txt
RUN pip install -r /code/requirements.txt
RUN groupadd -r django \
    && useradd -r -g django django

ADD . /code
COPY ./runserver.sh /runserver.sh

RUN chown -R django /code
RUN chmod +x /runserver.sh

WORKDIR /code

EXPOSE 8000
