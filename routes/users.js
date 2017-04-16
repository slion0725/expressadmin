var express = require('express')
var router = express.Router()
var UsersController = require('../controllers/UsersController')

UsersController.routes(router)

module.exports = router
