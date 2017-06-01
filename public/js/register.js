/*global axios, VeeValidate, Vue, $ */
window.onload = function() {
    Vue.use(VeeValidate)
    new Vue({
        el: '#register-form',
        data: {
            confirmpassword: '',
            csrfToken: '',
            email: '',
            name: '',
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
                axios.get('/token').then(function(response) {
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
                axios.post('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(function(response) {
                    if (response.status === 200 && response.data.status === 'success') {
                        this.syncCsrfToken = response.data.csrfToken
                        this.notify('Success', 'success')
                    }
                }.bind(this)).catch(function(error) {
                    console.log(error)
                    this.notify('Error', 'danger')
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
