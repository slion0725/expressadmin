/*global _, axios, UIkit, Vue*/
/*eslint no-console: "off"*/

window.onload = function() {
    new Vue({
        el: '#vue-app',
        data: {
            content: null,
            rows: {},
            page: 1,
            limit: 5,
            count: 0,
            filter: 'all',
            offset: function() {
                return this.limit * (this.page - 1)
            },
            csrfToken: ''
        },
        computed: {
            syncCsrfToken: {
                get: function(){

                },
                set: function(newToken){
                    this.csrfToken = newToken
                    axios.defaults.headers.common['X-CSRF-TOKEN'] = newToken
                }
            }
        },
        mounted: function() {
            this.getTodolist()
        },
        methods: {
            getTodolist: function() {
                axios.get('todolist/list', {
                    params: {
                        filter: this.filter,
                        limit: this.limit,
                        offset: this.offset()
                    }
                }).then(function(response) {
                    if (response.status === 200 && response.data.status === 'success') {
                        this.syncCsrfToken = response.data.csrfToken
                        this.rows = response.data.data.todolists.rows
                        this.count = response.data.data.todolists.count
                    }
                }.bind(this)).catch(function(error) {
                    console.log(error)
                })
            },
            submitBtn: function() {
                axios.post('todolist',{
                    content: this.content,
                }).then(function(response) {
                    if (response.status === 200 && response.data.status === 'success') {
                        this.syncCsrfToken = response.data.csrfToken
                        this.content = null
                        this.loadPage(1)
                    }
                }.bind(this)).catch(function(error) {
                    console.log(error)
                })
            },
            checkCompleted: function(id) {
                var obj = _.find(this.rows, {'id': id})
                axios.put('todolist/' + id, {
                    completed: !obj.completed
                }).then(function(response) {
                    if (response.status === 200 && response.data.status === 'success') {
                        this.syncCsrfToken = response.data.csrfToken
                        obj.completed = !obj.completed
                    }
                }.bind(this)).catch(function(error) {
                    console.log(error)
                })
            },
            deleteTodo: function(id) {
                UIkit.modal.confirm('Delete?').then(function() {
                    axios.delete('todolist/' + id).then(function(response) {
                        if (response.status === 200 && response.data.status === 'success') {
                            this.syncCsrfToken = response.data.csrfToken
                            UIkit.notification('Cleared', {status: 'success'})
                            this.loadPage(this.page)
                        }
                    }.bind(this)).catch(function(error) {
                        console.log(error)
                    })
                }.bind(this), function() {
                    console.log('Rejected')
                })
            },
            changeFilter: function(filter) {
                this.filter = filter
                this.loadPage(this.page)
            },
            loadPage: function(page) {
                this.page = page
                this.getTodolist()
            },
        }
    })
}
