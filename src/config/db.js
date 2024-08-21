const sequelize = require('sequelize');
//configurações da base de dados
const database = new sequelize('juanWeb', 'JuanWeb', 'Juan@23Q',
{
    dialect: 'mysql', host:'localhost', port: 3306
});
database.sync();
module.exports = database;