var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')

// parser
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

// validator
var expressValidator = require('express-validator')

// handlebars
var hbs = require('hbs')
var hbsutils = require('hbs-utils')(hbs)

// SESSIOM
var expressSession = require('express-session')
var RedisStore = require('connect-redis')(expressSession)
var redis = require('redis')

// XSS
var helmet = require('helmet')

// CSRF
var csurf = require('csurf')

// FORM-DATA
var multer = require('multer')
var upload = multer()

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
// hbs + hbsutils Partials
// hbs.registerPartials(__dirname + '/views/partials')
hbsutils.registerPartials(__dirname + '/views/partials')
hbsutils.registerWatchedPartials(__dirname + '/views/partials')
var blocks = {}
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name]
    if (!block) {
        block = blocks[name] = []
    }
    // for older versions of handlebars, use block.push(context(this));
    block.push(context.fn(this))
})

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n')

    // clear the block
    blocks[name] = []
    return val
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressValidator())

// SESSION
app.use(expressSession({
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        client: redis.createClient(),
        ttl: 86400
    }),
    secret: 'mySecret',
    saveUninitialized: false,
    resave: true
}))

// XSS
app.use(helmet())

// CSRF
app.use(csurf({
    cookie: true
}))

// FORM-DATA
app.use(upload.array())

// ROUTER
app.use('/', require('./routes/index'))
app.use('/login', require('./routes/login'))
app.use('/inner', require('./routes/inner'))
app.use('/register', require('./routes/register'))
app.use('/todolist', require('./routes/todolist'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
