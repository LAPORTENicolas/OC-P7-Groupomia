const mariadb       = require('mariadb');
const connection    = () => mariadb.createConnection({
    host: '127.0.0.1',
    user: 'groupomania',
    password: 'password',
    database: 'Groupomania'
})

module.exports      = connection;