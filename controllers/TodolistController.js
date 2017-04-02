var UsersModel = require('../models/UsersModel');

module.exports = {
    routes: function(router) {
        // for layout
        router.get('/', this.index);
        router.get('/list', this.list);
        // for form
        router.get('/:id', this.show);
        router.get('/add', this.add);
        router.get('/edit/:id', this.edit);
        // // for api
        router.post('/', this.create);
        router.put('/:id', this.store);
        router.delete('/:id', this.destroy);
    },
    index: function(req, res, next) {
        res.render('todolist', {title: 'todolist'});
    },
    list: function(res, req, next) {
        res.render('index', {title: req.session.title});
    },
    show: function(res, req, next) {
        res.render('index', {title: req.session.title});
    },
    add: function(res, req, next) {
        res.render('index', {title: req.session.title});
    },
    edit: function(res, req, next) {
        res.render('index', {title: req.session.title});
    },
    create: function(res, req, next) {
        res.render('index', {title: req.session.title});
    },
    store: function(res, req, next) {
        res.render('index', {title: req.session.title});
    },
    destroy: function(res, req, next) {
        res.render('index', {title: req.session.title});
    },
}
