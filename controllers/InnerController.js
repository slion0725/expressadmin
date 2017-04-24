module.exports = {
    routes: function(router) {
        router.get('/', this.index)
    },
    index: function(req, res) {
        res.render('inner', {
            title: 'Admin',
            importcss: ['css/inner.css'],
            importjs: ['js/inner.js']
        })
    }
}
