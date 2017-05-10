var db = require('../configs/DatabaseConfig.js')
var Sequelize = require('sequelize')

module.exports = db.define('verify', {
    from: {
        type: Sequelize.STRING,
        field: 'from'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    verify: {
        type: Sequelize.STRING,
        field: 'verify'
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
