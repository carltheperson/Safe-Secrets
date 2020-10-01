FROM ubuntu:20.04

ENV FLASK_PORT 8000

WORKDIR /flask_app

RUN apt update --fix-missing

RUN apt install python3 -y

RUN apt install python3-pip -y

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY app ./app

CMD uwsgi --http 0.0.0.0:$FLASK_PORT --module app:app --processes 1