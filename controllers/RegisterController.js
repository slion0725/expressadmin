var UsersModel = require('../models/UsersModel')
var RegistersModel = require('../models/RegistersModel')
var VerifyModel = require('../models/VerifyModel')
var RegisterSendmail = require('../lib/RegisterSendmail')

module.exports = {
    routes: function(router) {
        router.get('/', this.index)
        router.get('/token', this.token)
        router.post('/', this.create)
        router.get('/verify/:email/:verify', this.verify)
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

        RegistersModel.upsert({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(function(result) {
            console.log(result)
            RegisterSendmail.BaseUrl = 'http://localhost:3000/register/verify'
            RegisterSendmail.UserEmail = req.body.email
            // DEV
            RegisterSendmail.VerifyUrl()
            // PROD
            // RegisterSendmail.SendMail()

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
    },
    verify: function(req, res) {
        VerifyModel.count({
            where: {
                from: 'Register',
                email: req.params.email,
                verify: req.params.verify
            }
        }).then(function(result) {
            if (result === 0) {
                res.render('na', {
                    basehref: req.protocol + '://' + req.get('host') + '/',
                    title: 'Admin',
                    message: 'Not Found Verify Data'
                })
                return
            }

            RegistersModel.findOne({
                where: {
                    email: req.params.email
                }
            }).then(function(result) {
                UsersModel.create({
                    name: result.name,
                    email: result.email,
                    password: result.password,
                }).then(function() {
                    VerifyModel.destroy({
                        where: {
                            email: req.params.email
                        }
                    })

                    RegistersModel.destroy({
                        where: {
                            email: req.params.email
                        }
                    })

                    res.render('na', {
                        basehref: req.protocol + '://' + req.get('host') + '/',
                        title: 'Admin',
                        message: 'Success'
                    })

                }).catch(function(error) {
                    res.render('na', {
                        basehref: req.protocol + '://' + req.get('host') + '/',
                        title: 'Admin',
                        message: error
                    })
                })
            })
        })
    }
}
