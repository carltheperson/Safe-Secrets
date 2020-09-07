from app import r

class SecretNoneException(Exception):
  def __init__(self, message="Secret None"):
    super(SecretNoneException, self).__init__(message)

class DatabaseInteractor():

  def save_secret(name, secret):
    return r.set(name, secret)

  def fetch_secret(name):
    secret = r.get(name)

    if secret == None:
      raise SecretNoneException()

    return secret.decode("utf-8")