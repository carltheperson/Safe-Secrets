import base64
import hashlib
from cryptography.fernet import Fernet

def get_key(password):
  return base64.urlsafe_b64encode(hashlib.sha256(str.encode(password)).digest())

class EncryptionTool():

  def encrypt(password, string):
    key = get_key(password) 

    f = Fernet(key)
    
    token = f.encrypt(str.encode(string))

    return token

  def decrypt(password, token):
    key = get_key(password)

    f = Fernet(key)

    return f.decrypt(str.encode(token))  