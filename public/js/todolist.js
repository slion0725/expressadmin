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
                $.get('todolist/list', {
                    filter: this.filter,
                    limit: this.limit,
                    offset: this.offset()
                }).done(function(rs) {
                    if (rs.status === 'success') {
                        this.rows = rs.data.todolists.rows
                        this.count = rs.data.todolists.count
                    }
                }.bind(this), 'json')
            },
            loadPage: function(page) {
                this.page = page
                this.getTodolist()
            },
            clearCompleted: function() {
                UIkit.notification('Cleared', {status: 'success'})
            },
            checkCompleted: function(id, event) {
                var obj = _.find(this.rows, {'id': id})
                obj.completed = !obj.completed
                // $.post('todolist/list', {id: id}).done(function(rs) {}.bind(this), 'json')
            },
            changeFilter: function(filter) {
                this.filter = filter
                this.loadPage(this.page)
            }
        }
    })
})
