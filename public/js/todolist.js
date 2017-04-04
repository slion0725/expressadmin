$(function() {

    let todolistData = {
        content: null,
        rows: {},
        page: 1,
        limit: 3,
        count: 0,
        offset: function() {
            return this.limit * (this.page - 1)
        }
    }

    let todolist = new Vue({
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
                        todolist.changePage(1)
                    }
                })
            },
            getTodolist: function() {
                $.get('todolist/list', {
                    limit: todolistData.limit,
                    offset: todolistData.offset()
                }, function(rs) {
                    console.log(rs.data.todolists)
                    if (rs.status === 'success') {
                        todolistData.rows = rs.data.todolists.rows
                        todolistData.count = rs.data.todolists.count
                    }
                })
            },
            changePage: function(page) {
                this.page = page
                this.getTodolist()
            }
        }
    })
})
