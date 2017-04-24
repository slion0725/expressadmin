module.exports = {
    routes: function(router) {
        router.get('/', this.index)
    },
    index: function(req, res) {
        res.render('index', {
            basehref: req.protocol + '://' + req.get('host') + '/',
            title: 'Admin',
            importcss: ['css/index.css'],
            importjs: ['js/index.js']
        })
    }
}
