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

        TodolistModel.findAll({
            attributes: ['id', 'content'],
            order: 'id DESC',
            raw: true,
        }).then(function(todolist) {
            console.log(todolist);
            res.render('todolist', {
                title: 'todolist',
                list: todolist
            });
        });
    },
    add: function(req, res) {

    },
    edit: function(req, res) {

    },
    show: function(req, res) {

    },
    create: function(req, res) {
        TodolistModel.create({
                content: req.body.content
            })
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
        TodolistModel.update({
            content: req.body.content
        }, {
            where: {
                id: parseInt(req.params.id)
            }
        }).then(function(todolist) {
            res.status(200).json({
                message: 'success'
            });
        }).catch(function(error) {
            console.log(error);
            res.status(422).json({
                message: error
            });
        });
    },
    destroy: function(req, res) {
        TodolistModel.destroy({
            where: {
                id: parseInt(req.params.id)
            }
        }).then(function(todolist) {
            res.status(204).json({
                message: 'success'
            });
        }).catch(function(error) {
            res.status(422).json({
                message: error
            });
        });
    },
}
