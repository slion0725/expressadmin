module.exports = {
    routes: function(router) {
        router.get('/', this.index)
    },
    index: function(req, res) {
        res.render('login', {
            basehref: req.protocol + '://' + req.get('host') + '/',
            title: 'Admin',
            // importcss: ['css/login.css'],
            // importjs: ['js/login.js']
        })
    }
}
