const Sequelize = require('sequelize');

//construindo a conexão
const connection = new Sequelize(
    'perguntas','root','',
    { 
        host: 'localhost',
        dialect: 'mysql'
    }
)

//exportando a conexão para acessar de qualquer lugar do projeto
module.exports = connection;