read name
pip3 install $name && pip3 freeze | grep -i $name >> requirements.txt