#!/bin/bash

REDIS_PASSWORD=a-very-complex-password-here
STARTER_MS=redis-0.redis.redis.svc.cluster.local

MASTER=

while [ -z "$MASTER" ]
do
  echo "Checking if starter master/slave is online"
  if [ "$(redis-cli --no-auth-warning --raw -h $STARTER_MS -a $REDIS_PASSWORD ping)" = "PONG" ]; then
    echo "Starter master/slave is online"
    echo "Extracting who the master is"

    RESPONSE=$(redis-cli --no-auth-warning --raw -h $STARTER_MS -a $REDIS_PASSWORD info replication)

    ROLE=$(echo "$RESPONSE" | grep "role:" | cut -d ":" -f2)

    if [[ "$ROLE" == *"master"* ]]; then
      echo "The master was the starter master/slave"
      MASTER="$STARTER_MS"
    else
      echo "The master was not the starter master/slave. Finding out who is the actual master"
      MASTER_HOST=$(echo "$RESPONSE" | grep "master_host:" | cut -d ":" -f2)
      MASTER="$MASTER_HOST"
    fi
  else
    echo "The starter master/slave is not online"
  fi
  sleep 3
done

echo "The master is found to be: $MASTER"

echo "port 5000
sentinel monitor mymaster $MASTER 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
sentinel parallel-syncs mymaster 1
sentinel auth-pass mymaster $REDIS_PASSWORD
" > /etc/redis/sentinel.conf
cp /etc/redis/sentinel.conf /etc/redis/sentinel_init.conf

cat /etc/redis/sentinel.conf