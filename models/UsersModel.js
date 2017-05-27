var db = require('../configs/DatabaseConfig.js')
var Sequelize = require('sequelize')

module.exports = db.define('users', {
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
