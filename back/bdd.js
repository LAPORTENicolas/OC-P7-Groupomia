const mariadb       = require('mariadb');
const {
    APP_DB_HOST,
    APP_DB_USERNAME,
    APP_DB_PASSWORD,
    APP_DB_DATABASE
} = process.env

const connection    = () => mariadb.createConnection({
    host: APP_DB_HOST,
    user: APP_DB_USERNAME,
    password: APP_DB_PASSWORD,
    database: APP_DB_DATABASE
})

module.exports      = connection;