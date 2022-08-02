#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER zuvy;
    CREATE DATABASE zuvy_wallet_service_db ENCODING UTF8;
    GRANT ALL PRIVILEGES ON DATABASE zuvy_wallet_service_db TO zuvy;
    ALTER USER zuvy WITH PASSWORD 'password123';
    ALTER USER zuvy WITH SUPERUSER;
EOSQL