var db = require('./connection.js');
var Sequelize = require('sequelize');

module.exports = db.define('users', {
    firstName: {
        type: Sequelize.STRING,
        field: 'firstname'
    }
}, {freezeTableName: true});