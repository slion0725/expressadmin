var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/UsersController');

UsersController.routes(router);

// router.get('/', function(req, res, next) {
//     console.log(req.session.title);
//     res.render('index', {title: req.session.title});
// });

module.exports = router;
