from flask import request, jsonify
from app import app
from app import encryption
from app import database
from flask_cors import CORS
import cryptography

EncryptionTool = encryption.EncryptionTool
DatabaseInteractor = database.DatabaseInteractor

CORS(app)

@app.route("/save-secret", methods=["POST"])
def encrypt():
  req = request.json

  token = EncryptionTool.encrypt(req["password"], req["string"])

  DatabaseInteractor.save_secret(req["name"], token)

  return jsonify({"token": token.decode("utf-8")})

@app.route("/retrieve-secret", methods=["POST"])
def decrypt():
  req = request.json

  try:
    message = EncryptionTool.decrypt(req["password"], DatabaseInteractor.fetch_secret(req["name"]))
    return {"message": message.decode("utf-8")}
  except database.SecretNoneException:
    return jsonify({"errorMsg": "No secret with that name"}), 403
  except cryptography.fernet.InvalidToken:
    return jsonify({"errorMsg": "Wrong password"}), 403