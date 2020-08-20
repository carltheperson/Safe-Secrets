FROM ubuntu:20.04

WORKDIR /flask_app

RUN apt update

RUN apt install nginx -y

RUN apt install gunicorn -y

RUN apt install python3 -y

RUN apt install python3-pip -y

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY app ./app

COPY nginx.conf /etc/nginx/conf.d/

COPY start_application.sh .

CMD bash start_application.sh

EXPOSE 80

# docker build -t carlriis/flask_app .