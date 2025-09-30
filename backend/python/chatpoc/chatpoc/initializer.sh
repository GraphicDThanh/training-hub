# brew install psql
# start postgres server `pg_ctl -D /usr/local/var/postgres start`
# create virtual machine `mkvirtualenv chatpoc`
# `workon chatpoc`

pip install -r requirements.txt
psql postgres -c "CREATE DATABASE chatpoc WITH OWNER postgres;"