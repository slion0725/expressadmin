var UsersModel = require('../models/UsersModel')
var Sendmail = require('../lib/RegisterSendmail')

module.exports = {
    routes: function(router) {
        router.get('/', this.index)
        router.get('/token', this.token)
        router.post('/', this.create)
    },
    index: function(req, res) {
        res.render('register', {
            basehref: req.protocol + '://' + req.get('host') + '/',
            title: 'Admin',
            importjs: ['js/register.js']
        })
    },
    token: function(req, res) {
        res.status(200).json({
            status: 'success',
            csrfToken: req.csrfToken()
        })
    },
    create: function(req, res) {

        req.checkBody('name').notEmpty().isLength({
            min: 1,
            max: 255
        })
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
                verify: true
            }
        }).then(function(result) {
            if (result !== 0) {
                res.status(422).json({
                    status: 'error',
                    msg: 'Registered',
                    csrfToken: req.csrfToken()
                })
                return
            }
        })

        UsersModel.upsert({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(function(result) {
            console.log(result)
            Sendmail.SendMail(req.body.email)

            res.status(200).json({
                status: 'success',
                csrfToken: req.csrfToken()
            })
        }).catch(function(error) {
            res.status(422).json({
                status: 'error',
                msg: error,
                csrfToken: req.csrfToken()
            })
        })
    }
}
