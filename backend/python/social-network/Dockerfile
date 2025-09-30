FROM python:3.7.2
ENV PYTHONUNBUFFERED 1
RUN mkdir /src
RUN mkdir /static
WORKDIR /src

ADD ./src /src
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# RUN groupadd -r django \
#     && useradd -r -g django django

# RUN chown -R django /src
RUN chmod +x ./runserver.sh
EXPOSE 8000
