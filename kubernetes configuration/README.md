# Brining up the cluseter
The order of stuff to do so you don't mess up.

(be inside this folder)

```

kubectl create namespace apps
kubectl create namespace redis
kubectl create namespace monitoring

kubectl apply -n redis -f ./secrets
kubectl apply -n apps -f ./secrets

kubectl apply -n redis -f ./database

kubectl apply -n apps -f ./entrypoint

kubectl apply -n apps -f ./encryption\ program

kubectl apply -n monitoring -f ./prometheus/operator/definitions

kubectl apply -n monitoring -f ./prometheus/operator

kubectl apply -n monitoring -f ./prometheus/node \exporter

kubectl apply -n monitoring -f ./prometheus/kubernetes/kube-state-metrics

kubectl apply -n monitoring -f ./prometheus/kubernetes

kubectl apply -n monitoring -f ./prometheus

kubectl apply -n apps -f ./prometheus/apps

kubectl apply -n monitoring -f ./grafana

```