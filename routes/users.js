var express = require('express');
var router = express.Router();

var userModel = require('../database/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {

    userModel.findOne().then(function(user) {
        // res.send(user.get('firstName'));
        res.render('index', {title: user.get('firstName')});
    });

});

module.exports = router;
