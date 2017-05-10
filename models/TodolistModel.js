var db = require('../configs/DatabaseConfig.js')
var Sequelize = require('sequelize')

module.exports = db.define('todolist', {
    content: {
        type: Sequelize.STRING,
        field: 'content'
    },
    completed: {
        type: Sequelize.BOOLEAN,
        field: 'completed',
        defaultValue: false,
    }
}, {
    freezeTableName: true,
    timestamps: true
})
