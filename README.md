# 🔒 Safe Secrets

**Personal note** _I will use this project to learn my self container orchestration trough Kubernetes. I will also use it to learn other skills concerning robust full-stack applications._

The application will let you save your secrets safely by encrypting them. Below is an owerview of how it works.

Here is the flow of the application:

![](diagram.png)

### The backend

It's made with Flask in Python. It uses the encryption library Fernet that encrypts using AES (Advanced Encryption Standard). The password provided by the user is hashed using SHA256 which Fernet will accept as a key.
The API uses Gunicorn as a WSGI which is exposed by Nginx.

### The database

It's made with Redis. The setup uses 1 master and 2 slaves and is created using a StatefulSet. There is also another StatefulSet that creates 3 sentinels to trigger a failover if the master fails. Both kinds of pods in the StatefulSets needed special Shell scripts to find the master when initializing.
Both RDB and AOF persistence is enabled.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
