var express = require('express')
var router = express.Router()
var InnerController = require('../controllers/InnerController')

InnerController.routes(router)

module.exports = router
