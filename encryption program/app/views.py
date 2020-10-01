from flask import request, jsonify, Response
from app import app
from app import encryption
from app import database
from flask_cors import CORS
import cryptography
from app import monitoring
import prometheus_client

EncryptionTool = encryption.EncryptionTool
DatabaseInteractor = database.DatabaseInteractor

CORS(app)
monitoring.setup_metrics(app)

@app.route("/save-secret", methods=["POST"])
def encrypt():
  monitoring.SAVE_COUNT.labels("encryption_program", request.method, request.path).inc()
  req = request.json

  token = EncryptionTool.encrypt(req["password"], req["string"])

  DatabaseInteractor.save_secret(req["name"], token)

  return jsonify({"token": token.decode("utf-8")})

@app.route("/retrieve-secret", methods=["POST"])
def decrypt():
  monitoring.RETRIEVE_COUNT.labels("encryption_program", request.method, request.path).inc()
  req = request.json

  try:
    message = EncryptionTool.decrypt(req["password"], DatabaseInteractor.fetch_secret(req["name"]))
    return {"message": message.decode("utf-8")}
  except Exception as e:
    monitoring.ERROR_MSG_COUNT.labels("encryption_program", request.path).inc()
    if e == database.SecretNoneException:
      return jsonify({"errorMsg": "No secret with that name"}), 403
    elif e == cryptography.fernet.InvalidToken:
      return jsonify({"errorMsg": "Wrong password"}), 403
    else:
      return jsonify({"errorMsg": "Something unexpected happend"}), 500


@app.route("/metrics")
def metrics():
  return Response(prometheus_client.generate_latest(), mimetype=str('text/plain; version=0.0.4; charset=utf-8'))