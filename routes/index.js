var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.title = 'abc';
    console.log(req.session.title);
    res.render('index', {title: req.session.title});
});

module.exports = router;
