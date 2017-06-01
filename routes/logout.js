var express = require('express')
var router = express.Router()
var LogoutController = require('../controllers/LogoutController')

LogoutController.routes(router)

module.exports = router
