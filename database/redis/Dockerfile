FROM redis

COPY ./redis.conf /redis-tmp/

COPY ./startup.sh /

CMD chmod +x /startup.sh & sh /startup.sh