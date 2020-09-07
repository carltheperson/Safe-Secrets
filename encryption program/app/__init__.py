from flask import Flask
import redis

app = Flask(__name__)

r = redis.Redis(
  host="database",
  port="3000",
  password="SuperSecretSecureStrongPass"
)

from app import views
