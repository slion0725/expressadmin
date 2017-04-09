$(function() {

    var todolistData = {
        content: null,
        rows: {},
        page: 1,
        limit: 3,
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
                    content: todolistData.content
                }, function(rs) {
                    if (rs.status === 'success') {
                        todolist.content = null
                        todolist.loadPage(1)
                    }
                }, 'json')
            },
            getTodolist: function() {
                $.get('todolist/list', {
                    limit: todolistData.limit,
                    offset: todolistData.offset()
                }, function(rs) {
                    if (rs.status === 'success') {
                        todolistData.rows = rs.data.todolists.rows
                        todolistData.count = rs.data.todolists.count
                    }
                })
            },
            loadPage: function(page) {
                this.page = page
                this.getTodolist()
            },
            clearCompleted: function() {
                UIkit.notification('Cleared', {status: 'success'});
            },
            checkCompleted: function(id, event) {
                var obj = _.find(this.rows, {'id': id});
                obj.completed = !obj.completed;  
            }
        }
    })
})
