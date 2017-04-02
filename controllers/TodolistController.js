var TodolistModel = require('../models/TodolistModel');

module.exports = {
    routes: function(router) {
        // for page
        router.get('/', this.index);
        // for form
        router.get('/add', this.add);
        router.get('/edit/:id', this.edit);
        // // for api
        router.get('/:id', this.show);
        router.post('/', this.create);
        router.put('/:id', this.store);
        router.delete('/:id', this.destroy);
    },
    index: function(req, res) {
        console.log(req.baseUrl);
        console.log(req.body);
        console.log(req.params);
        res.render('todolist', {
            title: 'todolist'
        });
    },
    add: function(req, res) {

    },
    edit: function(req, res) {

    },
    show: function(req, res) {

    },
    create: function(req, res) {
      console.log(req.body);
      console.log(req.params);
        TodolistModel.build({
                content: req.body.content
            })
            .save()
            .then(function(todolist) {
                res.status(200).json({
                    message: 'success'
                });
            }).catch(function(error) {
                res.status(422).json({
                    message: error
                });
            });
    },
    store: function(req, res) {

    },
    destroy: function(req, res) {
        res.status(204);
    },
}
