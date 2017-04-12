/*eslint no-console: "off"*/

var TodolistModel = require('../models/TodolistModel')

module.exports = {
    routes: function(router) {
        // for page
        router.get('/', this.index)
        // for form
        router.get('/add', this.add)
        router.get('/edit/:id', this.edit)
        // // for api
        router.get('/list', this.list)
        router.get('/:id', this.show)
        router.post('/', this.create)
        router.put('/:id', this.store)
        router.delete('/:id', this.destroy)
    },
    index: function(req, res) {
        // console.log(req.baseUrl);
        // console.log(req.body);
        // console.log(req.params);
        res.render('todolist', {
            title: 'todolist',
            importjs: 'js/todolist.js'
        })
    },
    add: function(req, res) {
        console.log(req)
        console.log(res)
    },
    edit: function(req, res) {
        console.log(req)
        console.log(res)
    },
    list: function(req, res) {

        req.checkQuery('limit').notEmpty().isInt()
        req.checkQuery('offset').notEmpty().isInt()

        var errors = req.validationErrors()
        if (errors) {
            res.status(422).json(errors)
            return
        }

        req.sanitizeQuery('limit').toInt()
        req.sanitizeQuery('offset').toInt()

        var Operators = {
            attributes: [
                'id', 'content', 'completed', 'createdAt'
            ],
            order: 'id DESC',
            limit: (req.query.limit),
            offset: (req.query.offset),
            raw: true
        }

        switch (req.query.filter) {
        case('active'):
            Operators.where = {
                completed: false
            }
            break
        case('completed'):
            Operators.where = {
                completed: true
            }
            break
        default:
            Operators.$or = [
                {
                    completed: true
                }, {
                    completed: false
                }
            ]
            break
        }

        TodolistModel.findAndCountAll(Operators).then(function(todolists) {
            console.log(todolists)
            res.status(200).json({
                status: 'success',
                data: {
                    todolists: todolists
                }
            })
        })
    },
    show: function(req, res) {
        console.log(req)
        console.log(res)
    },
    create: function(req, res) {
        TodolistModel.create({content: req.body.content}).then(function(todolist) {
            console.log(todolist)
            res.status(200).json({status: 'success'})
        }).catch(function(error) {
            res.status(422).json({status: error})
        })
    },
    store: function(req, res) {
        TodolistModel.update({
            completed: req.body.completed
        }, {
            where: {
                id: parseInt(req.params.id)
            }
        }).then(function(todolist) {
            console.log(todolist)
            res.status(200).json({status: 'success'})
        }).catch(function(error) {
            res.status(422).json({status: error})
        })
    },
    destroy: function(req, res) {
        TodolistModel.destroy({
            where: {
                id: parseInt(req.params.id)
            }
        }).then(function(todolist) {
            console.lgo(todolist)
            res.status(200).json({status: 'success'})
        }).catch(function(error) {
            res.status(422).json({status: error})
        })
    }
}
