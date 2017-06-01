var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var UsersModel = require('../models/UsersModel')

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        UsersModel.findOne({
            where: {
                email: email
            }
        }).then(function (result) {
            if (result == null) {
                return done(null, false, {
                    message: 'Incorrect username.'
                })
            }

            if (result.password != password) {
                return done(null, false, {
                    message: 'Incorrect password.'
                })
            }

            var user = {
                id: result.id,
                name: result.name,
                email: result.email
            }

            console.log(user);

            return done(null, user)
        }).catch(function (error) {
            return done(error, false)
        })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    UsersModel.findOne({
        where: {
            id: id
        }
    }).then(function (user) {
        return done(null, user)
    })
})

passport.authenticationMiddleware = function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}

module.exports = passport