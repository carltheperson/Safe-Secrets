from flask import request, jsonify
from app import app
from app import encryption
from app import database
import cryptography

EncryptionTool = encryption.EncryptionTool
DatabaseInteractor = database.DatabaseInteractor

@app.route("/save-secret")
def encrypt():
  req = request.json

  token = EncryptionTool.encrypt(req["password"], req["string"])

  DatabaseInteractor.save_secret(req["name"], token)

  return jsonify({"token": token.decode("utf-8")})

@app.route("/retrieve-secret")
def decrypt():
  req = request.json

  try:
    message = EncryptionTool.decrypt(req["password"], DatabaseInteractor.fetch_secret(req["name"]))
    return {"message": message.decode("utf-8")}
  except database.SecretNoneException:
    return jsonify({"errorMsg": "No secret with that name"}), 400
  except cryptography.fernet.InvalidToken:
    return jsonify({"errorMsg": "Wrong password"}), 400