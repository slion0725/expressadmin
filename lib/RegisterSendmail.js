var transporter = require('../configs/SendmailConfig.js')
var VerifyModel = require('../models/VerifyModel')
var _ = require('lodash')

module.exports = {
    VerifyUrl: function() {
        var random = _.random(111111, 999999).toString()
        VerifyModel.upsert({
            from: 'Register Verify',
            email: this.UserEmail,
            verify: random
        }).then(function(result) {
            console.log(result)
        }).catch(function(error) {
            console.log(error)
        })
        return 'http://localhost:3000/verifyregister/' + this.UserEmail + '/' + random
    },
    SendMail: function(email) {
        this.UserEmail = email
        var options = {
            from: '"Admin Service" <admin@service.com>',
            to: this.UserEmail, // list of receivers
            subject: 'Register Verify Url',
            html: this.VerifyUrl()
        }
        transporter.sendMail(options, function(error, info) {
            if (error) {
                console.error(error)
            }
            console.log('Message %s sent: %s', info.messageId, info.response)
        })
    }
}
