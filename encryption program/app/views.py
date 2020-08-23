from flask import request, jsonify
from app import app
from app import encryption
import cryptography

EncryptionTool = encryption.EncryptionTool

@app.route("/encrypt")
def encrypt():
  req = request.json

  token = EncryptionTool.encrypt(req["password"], req["string"])

  return jsonify({"token": token})

@app.route("/decrypt")
def decrypt():
  req = request.json

  try:
    message = EncryptionTool.decrypt(req["password"], req["token"])
    return {"message": message}
  except cryptography.fernet.InvalidToken:
    return jsonify({}), 400