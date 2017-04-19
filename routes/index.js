var express = require('express')
var router = express.Router()
var IndexController = require('../controllers/IndexController')

IndexController.routes(router)

module.exports = router
