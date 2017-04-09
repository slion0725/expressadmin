var TodolistModel = require('../models/TodolistModel');

module.exports = {
    routes: function(router) {
        // for page
        router.get('/', this.index);
        // for form
        router.get('/add', this.add);
        router.get('/edit/:id', this.edit);
        // // for api
        router.get('/list', this.list);
        router.get('/:id', this.show);
        router.post('/', this.create);
        router.put('/:id', this.store);
        router.delete('/:id', this.destroy);
    },
    index: function(req, res) {
        // console.log(req.baseUrl);
        // console.log(req.body);
        // console.log(req.params);
        res.render('todolist', {
            title: 'todolist',
            importjs: 'js/todolist.js'
        });
    },
    add: function(req, res) {},
    edit: function(req, res) {},
    list: function(req, res) {

        var Operators = {
            attributes: [
                'id', 'content', 'completed', 'createdAt'
            ],
            order: 'id DESC',
            limit: parseInt(req.query.limit),
            offset: parseInt(req.query.offset),
            raw: true
        };

        switch (req.query.filter) {
            case('active'):
                Operators.where = {
                    completed: false
                };
                break;
            case('completed'):
                Operators.where = {
                    completed: true
                };
                break;
            default:
                Operators.$or = [
                    {
                        completed: true
                    }, {
                        completed: false
                    }
                ];
                break;
        };

        TodolistModel.findAndCountAll(Operators).then(function(todolists) {
            console.log(todolists);
            res.status(200).json({
                status: 'success',
                data: {
                    todolists: todolists
                }
            });
        });
    },
    show: function(req, res) {},
    create: function(req, res) {
        TodolistModel.create({content: req.body.content}).then(function(todolist) {
            res.status(200).json({status: 'success'});
        }).catch(function(error) {
            res.status(422).json({message: error});
        });
    },
    store: function(req, res) {
      console.log('put');
        TodolistModel.update({
            // content: req.body.content,
            completed: req.body.completed,
        }, {
            where: {
                id: parseInt(req.params.id)
            }
        }).then(function(todolist) {
            res.status(200).json({message: 'success'});
        }).catch(function(error) {
            console.log(error);
            res.status(422).json({message: error});
        });
    },
    destroy: function(req, res) {
        TodolistModel.destroy({
            where: {
                id: parseInt(req.params.id)
            }
        }).then(function(todolist) {
            res.status(204).json({message: 'success'});
        }).catch(function(error) {
            res.status(422).json({message: error});
        });
    }
}
