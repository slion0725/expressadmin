var UsersModel = require('../models/UsersModel');

module.exports = {
    routes: function(router) {
        router.get('/', this.index);
        router.get('/list', this.list);

        // router.get('/:id', this.show);
        // router.get('/add', this.add);
        // router.get('/edit/:id', this.edit);
        //
        // router.post('/', this.create);
        // router.put('/:id', this.store);
        // router.delete('/:id', this.destroy);
        return router;
    },
    index: function(req, res, next) {
        UsersModel.findOne().then(function(user) {
            res.render('index', {
                title: req.session.title,
                body: user.get('firstName')
            });
        });
        // res.send('999');
    },
    list: function(res, req, next) {
        console.log(req.session);
        // UsersModel.findOne().then(function(user) {
        //     // res.send(user.get('firstName'));
        //     // res.render('index', {title: user.get('firstName')});
        res.render('index', {title: req.session.title});
        // });
    }
}
