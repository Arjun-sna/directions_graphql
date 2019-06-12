if [ "${NODE_ENV}" = "production" ]; then
  DB_PROTOCOL=$(echo $DATABASE_URL | cut -d':' -f1)
  DB_DETAILS=$(echo $DATABASE_URL | cut -d'/' -f3)
  DB_NAME=$(echo $DATABASE_URL | cut -d'/' -f4)
  HOST_NAME=$(echo $DB_DETAILS | cut -d'@' -f2 | cut -d':' -f1)
  PORT=$(echo $DB_DETAILS | cut -d'@' -f2 | cut -d':' -f2)
  USER_NAME=$(echo $DB_DETAILS | cut -d'@' -f1 | cut -d':' -f1)
  PASSWORD=$(echo $DB_DETAILS | cut -d'@' -f1 | cut -d':' -f2)

  echo "{ \"${NODE_ENV}\" : {	\"username\" : \"${USER_NAME}\",	\"password\": \"${PASSWORD}\",	\"database\": \"${DB_NAME}\",  \"host\": \"${HOST_NAME}\",	\"port\": ${PORT},	\"dialect\": \"${DB_PROTOCOL}\", \"protocol\": \"${DB_PROTOCOL}\",	\"operatorsaliases\": false, \"dialectOptions\": { \"ssl\": true,\"sslfactory\": \"org.postgresql.ssl.NonValidatingFactory\" } } }" > config/config.json

  node_modules/.bin/sequelize db:migrate
fi
