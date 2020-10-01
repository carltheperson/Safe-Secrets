from flask import request
from prometheus_client import Counter, Histogram
import time

RETRIEVE_COUNT = Counter("retrive_count", "The amount of times the API gets a request to retrieve a secret", ["app", "method" ,"endpoint"])
SAVE_COUNT = Counter("save_count", "The amount of times the API gets a request to save a secret", ["app", "method" ,"endpoint"])
ERROR_MSG_COUNT = Counter("error_msg_count", "The amount of exceptions that gets handled from requests", ["app", "endpoint"])
REQUEST_LATENCY = Histogram("request_latency_seconds", "How long it takes a request to complete", ["app", "endpoint"])

def start_timer():
  request.start_time = time.time()

def stop_timer(response):
  resp_time = time.time() - request.start_time

  REQUEST_LATENCY.labels("encryption_program", request.path).observe(resp_time)
  
  return response

def setup_metrics(app):
  app.before_request(start_timer)
  app.after_request(stop_timer)