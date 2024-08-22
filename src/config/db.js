const sequelize = require('sequelize');
//configurações da base de dados
const database = new sequelize('juanWeb', 'JuanWeb', 'Juan@23Q',
{
    dialect: 'mssql', host:'localhost', port: 1433
});
database.sync();
module.exports = database;