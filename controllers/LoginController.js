var UsersModel = require('../models/UsersModel')

module.exports = {
    routes: function(router) {
        router.get('/', this.index)
        router.post('/', this.create)
    },
    index: function(req, res) {
        res.render('login', {
            basehref: req.protocol + '://' + req.get('host') + '/',
            title: 'Admin',
            importjs: ['js/login.js']
        })
    },
    token: function(req, res) {
        res.status(200).json({
            status: 'success',
            csrfToken: req.csrfToken()
        })
    },
    create: function(req, res) {

        req.checkBody('email').notEmpty().isLength({
            min: 1,
            max: 255
        })

        req.checkBody('password').notEmpty().isLength({
            min: 1,
            max: 20
        })

        var errors = req.validationErrors()
        if (errors) {
            res.status(422).json({
                status: 'error',
                msg: errors,
                csrfToken: req.csrfToken()
            })
            return
        }

        UsersModel.count({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function(result) {
            if (result !== 1) {
                res.status(422).json({
                    status: 'error',
                    msg: 'Not Found',
                    csrfToken: req.csrfToken()
                })
                return
            }
            res.status(200).json({
                status: 'success',
                msg: 'Login',
                csrfToken: req.csrfToken()
            })
        })
    }
}
