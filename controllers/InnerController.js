var ensurelogin = require('connect-ensure-login')

module.exports = {
    routes: function(router) {
        router.get('/',ensurelogin.ensureLoggedIn('/login'), this.index)
    },
    index: function(req, res) {
        res.render('inner', {
            basehref: req.protocol + '://' + req.get('host') + '/',
            title: 'Admin',
            // importcss: ['css/inner.css'],
            // importjs: ['js/inner.js']
        })
    }
}
