#!/bin/bash

echo "Checking if the cluster is live"
if [ "$(redis-cli -h sentinel -p 5000 ping)" != "PONG" ]; then
  echo "No sentinel found. This might be initial startup"

  if [ "$(hostname)" = "redis-0" ]; then
    echo "I'm the master. Not chaning config file"
  else
    echo "I'm not the master. Making myself a slave"
    echo "slaveof redis-0.redis.redis.svc.cluster.local 6379" >> /redis-tmp/redis.conf
  fi
else
  echo "Sentinel found, finding master"
  MASTER="$(redis-cli -h sentinel -p 5000 sentinel get-master-addr-by-name mymaster | grep -E '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}')"
  echo "Master found : $MASTER, updating redis.conf"
  echo "slaveof $MASTER 6379" >> /redis-tmp/redis.conf
fi

cp /redis-tmp/redis.conf /etc/redis

echo "$(ls /etc/redis/)"