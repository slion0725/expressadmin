var passport = require('../lib/Passport')
var ensurelogin = require('connect-ensure-login')

module.exports = {
    routes: function (router) {
        router.get('/', ensurelogin.ensureLoggedOut('/inner'), this.index)
        router.post('/', passport.authenticate('local'), this.create)
    },
    index: function (req, res) {
        res.render('login', {
            basehref: req.protocol + '://' + req.get('host') + '/',
            title: 'Admin',
            importjs: ['js/login.js']
        })
    },
    create: function (req, res) {
        res.status(200).json({
            status: 'success',
            msg: 'Login',
            csrfToken: req.csrfToken()
        })
    }
}