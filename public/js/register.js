/*global Vue, VeeValidate */
window.onload = function() {
    Vue.use(VeeValidate)
    new Vue({
        el: '#register-form',
        data: {
            name: '',
            email: '',
            password: '',
        },
        mounted: function() {

        },
        methods: {
            validateForm: function() {
                this.$validator.validateAll().then(function(result) {
                    if (!result) {
                        return
                    }
                }).catch(function(e) {
                    console.log(e)
                })
            }
        }
    })
}
