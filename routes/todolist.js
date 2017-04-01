var express = require('express');
var router = express.Router();
var TodolistController = require('../controllers/TodolistController');

TodolistController.routes(router);

module.exports = router;
