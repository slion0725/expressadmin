$(function() {

    var todolistData = {
        content: null,
        rows: {},
        page: 1,
        limit: 5,
        count: 0,
        filter: 'all',
        offset: function() {
            return this.limit * (this.page - 1)
        }
    }

    var todolist = new Vue({
        el: '#vue-app',
        data: todolistData,
        mounted: function() {
            this.getTodolist()
        },
        methods: {
            submitBtn: function() {
                $.post('todolist', {
                    content: this.content
                }, function(rs) {
                    if (rs.status === 'success') {
                        this.content = null
                        this.loadPage(1)
                    }
                }.bind(this), 'json')
            },
            getTodolist: function() {
                axios.get('todolist/list', {
                        params: {
                            filter: this.filter,
                            limit: this.limit,
                            offset: this.offset(),
                        }
                    })
                    .then(function(response) {
                        if (response.status === 200 && response.data.status === 'success') {
                            this.rows = response.data.data.todolists.rows
                            this.count = response.data.data.todolists.count
                        }
                    }.bind(this))
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            loadPage: function(page) {
                this.page = page
                this.getTodolist()
            },
            clearCompleted: function() {
                UIkit.notification('Cleared', {
                    status: 'success'
                })
            },
            checkCompleted: function(id, event) {
                var obj = _.find(this.rows, {
                    'id': id
                })
                axios.put('todolist/' + id, {
                        completed: !obj.completed
                    })
                    .then(function(response) {
                        console.log(response);
                        if (response.status === 200 && response.data.status === 'success') {
                            obj.completed = !obj.completed
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            changeFilter: function(filter) {
                this.filter = filter
                this.loadPage(this.page)
            }
        }
    })
})
