var express = require('express')
var router = express.Router()
var LoginController = require('../controllers/LoginController')

LoginController.routes(router)

module.exports = router
