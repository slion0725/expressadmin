var express = require('express')
var router = express.Router()
var RegisterController = require('../controllers/RegisterController')

RegisterController.routes(router)

module.exports = router
