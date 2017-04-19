/*eslint no-console: "off"*/

module.exports = {
    routes: function(router) {
        router.get('/', this.index)
    },
    index: function(req, res) {
        res.render('index', {
            title:'Admin',
            importcss: ['css/index.css'],
            importjs: ['js/index.js']
        })
    }
}
