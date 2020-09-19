from flask import Flask
import redis

app = Flask(__name__)

from app import views
