module.exports = {
    routes: function (router) {
        router.get('/', this.index)
    },
    index: function (req, res) {
        res.status(200).json({
            status: 'success',
            csrfToken: req.csrfToken()
        })
    }
}