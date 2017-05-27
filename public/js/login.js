/*global axios, VeeValidate, Vue, $ */
window.onload = function() {
    Vue.use(VeeValidate)
    new Vue({
        el: '#login-form',
        data: {
            confirmpassword: '',
            csrfToken: '',
            email: '',
            password: '',
        },
        computed: {
            syncCsrfToken: {
                get: function() {},
                set: function(newToken) {
                    this.csrfToken = newToken
                    axios.defaults.headers.common['X-CSRF-TOKEN'] = newToken
                }
            }
        },
        mounted: function() {
            this.getToken()
        },
        methods: {
            getToken: function() {
                axios.get('register/token').then(function(response) {
                    if (response.status === 200 && response.data.status === 'success') {
                        this.syncCsrfToken = response.data.csrfToken
                    }
                }.bind(this)).catch(function(error) {
                    console.log(error)
                })
            },
            validateForm: function() {
                this.$validator.validateAll().then(function(result) {
                    if (!result) {
                        return
                    }
                    this.submitForm()
                }.bind(this)).catch(function(e) {
                    console.log(e)
                })
            },
            submitForm: function() {
                axios.post('login', {
                    email: this.email,
                    password: this.password
                }).then(function(response) {
                    if (response.status === 200 && response.data.status === 'success') {
                        this.syncCsrfToken = response.data.csrfToken
                        this.notify(response.data.msg, 'success')
                    }
                }.bind(this)).catch(function(error) {
                    this.notify(error.response.data.msg, 'danger')
                }.bind(this))

            },
            notify: function(message, type) {
                $.notify({
                    message: message
                }, {
                    type: type
                })
            }
        }
    })
}
