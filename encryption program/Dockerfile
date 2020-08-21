FROM ubuntu:20.04

WORKDIR /flask_app

RUN apt update

RUN apt install gunicorn -y

RUN apt install python3 -y

RUN apt install python3-pip -y

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY app ./app

CMD gunicorn -w 1 app:app -b 0.0.0.0:8000

EXPOSE 8000

# docker build -t carlriis/flask_app .