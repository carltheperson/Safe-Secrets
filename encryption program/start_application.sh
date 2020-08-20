service nginx start
unlink /etc/nginx/sites-enabled/default
nginx -s reload
gunicorn -w 1 app:app