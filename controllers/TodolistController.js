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
        res.render('todolist/todolist', {
            basehref: req.protocol + '://' + req.get('host') + '/',
            title: 'todolist',
            importcss: ['todolist/layout.css', 'todolist/todolist.css'],
            importjs: ['js/plugins.js', 'todolist/layout.js', 'todolist/todolist.js'],
            layout: 'todolist/layout'
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
        req.checkQuery('filter').notEmpty()

        var errors = req.validationErrors()
        if (errors) {
            res.status(422).json({
                status: errors,
                csrfToken: req.csrfToken()
            })
            return
        }

        req.sanitizeQuery('limit').toInt()
        req.sanitizeQuery('offset').toInt()

        var Operators = {
            attributes: [
                'id', 'content', 'completed', 'createdAt'
            ],
            order: 'id DESC',
            limit: req.query.limit,
            offset: req.query.offset,
            raw: true
        }

        switch (req.query.filter) {
            case ('active'):
                Operators.where = {
                    completed: false
                }
                break
            case ('completed'):
                Operators.where = {
                    completed: true
                }
                break
            default:
                Operators.$or = [{
                    completed: true
                }, {
                    completed: false
                }]
                break
        }

        TodolistModel.findAndCountAll(Operators).then(function(todolists) {
            console.log(todolists)
            res.status(200).json({
                status: 'success',
                data: {
                    todolists: todolists
                },
                csrfToken: req.csrfToken()
            })
        })
    },
    show: function(req, res) {
        console.log(req)
        console.log(res)
    },
    create: function(req, res) {

        req.checkBody('content').notEmpty().isLength({
            min: 1,
            max: 255
        })

        var errors = req.validationErrors()
        if (errors) {
            res.status(422).json({
                status: errors,
                csrfToken: req.csrfToken()
            })
            return
        }

        TodolistModel.create({
            content: req.body.content
        }).then(function(todolist) {
            console.log(todolist)
            res.status(200).json({
                status: 'success',
                csrfToken: req.csrfToken()
            })
        }).catch(function(error) {
            res.status(422).json({
                status: error,
                csrfToken: req.csrfToken()
            })
        })
    },
    store: function(req, res) {

        req.checkParams('id').isInt()
        req.checkBody('completed').isBoolean()

        var errors = req.validationErrors()
        if (errors) {
            res.status(422).json({
                status: errors,
                csrfToken: req.csrfToken()
            })
            return
        }

        req.sanitizeParams('id').toInt()

        TodolistModel.update({
            completed: req.body.completed
        }, {
            where: {
                id: req.params.id
            }
        }).then(function(todolist) {
            console.log(todolist)
            res.status(200).json({
                status: 'success',
                csrfToken: req.csrfToken()
            })
        }).catch(function(error) {
            res.status(422).json({
                status: error,
                csrfToken: req.csrfToken()
            })
        })
    },
    destroy: function(req, res) {

        req.checkParams('id').isInt()

        var errors = req.validationErrors()
        if (errors) {
            res.status(422).json({
                status: errors,
                csrfToken: req.csrfToken()
            })
            return
        }

        req.sanitizeParams('id').toInt()

        TodolistModel.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(todolist) {
            console.log(todolist)
            res.status(200).json({
                status: 'success',
                csrfToken: req.csrfToken()
            })
        }).catch(function(error) {
            res.status(422).json({
                status: error,
                csrfToken: req.csrfToken()
            })
        })
    }
}
