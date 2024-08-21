// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
// Criando a tabela Sala
const sala = database.define('Sala', {
    IDSala: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Minima:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    Maxima:{
        type: Sequelize.INTEGER,
        allowNull: true
    }
});
// Exportando essa tabela
module.exports = sala;