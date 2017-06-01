var express = require('express')
var router = express.Router()
var TokenController = require('../controllers/TokenController')

TokenController.routes(router)

module.exports = router
