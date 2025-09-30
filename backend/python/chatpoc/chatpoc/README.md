* Require:
    - postgres install on OS client
* Create Postgres DB for running app
    - `psql postgres -c "CREATE DATABASE chatpoc WITH OWNER postgres;"`
* Install package for app
    - `./initializer.sh`
* Run app:
    - `./entrypoint.sh`

`dropdb chatpoc -h localhost -U postgres`
`dropdb chatpoc -h localhost`
