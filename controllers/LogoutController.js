var ensurelogin = require('connect-ensure-login')

module.exports = {
    routes: function (router) {
        router.get('/', ensurelogin.ensureLoggedIn('/login'), this.index)
    },
    index: function (req, res) {
        req.logOut()
        res.redirect('/')
    }
}