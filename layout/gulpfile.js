var gulp = require('gulp')
var concat = require('gulp-concat')
var concatCss = require('gulp-concat-css')
var sass = require('gulp-sass')
// var gulpCompass = require('gulp-compass')
var notify = require('gulp-notify')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

gulp.task('js', function() {
    return gulp.src(
        [
            './bower_components/axios/dist/axios.min.js',
            './bower_components/file-saver/FileSaver.min.js',
            './bower_components/holderjs/holder.min.js',
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/lodash/dist/lodash.min.js',
            './bower_components/moment/moment.js',
            './bower_components/moment-timezone/builds/moment-timezone-with-data.min.js',
            // './bower_components/vue/dist/vue.min.js',
            './bower_components/vue/dist/vue.js',
        ]
        )
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify('JS Done'))
})

gulp.task('css', function() {
    // gulp.src(
    //     [
    //         './bower_components/uikit/dist/js/uikit.min.js',
    //         './bower_components/uikit/dist/js/uikit-icons.min.js',
    //     ]
    //     )
    //     .pipe(concat('layout.js'))
    //     .pipe(gulp.dest('./dist/js'))
    //     .pipe(notify('Layout js done'))

    gulp.src(
        [
            './bower_components/bootstrap/dist/js/bootstrap.min.js',
            './bower_components/bootbox.js/bootbox.js',
            './bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js',
            './bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect-collapsible-groups.js',
            './bower_components/bootstrap-submenu/dist/js/bootstrap-submenu.min.js',
            './bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
            './bower_components/jquery-mousewheel/jquery.mousewheel.min.js',
            './bower_components/jqueryfiletree/dist/jQueryFileTree.min.js',
            './bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
            './bower_components/remarkable-bootstrap-notify/dist/bootstrap-notify.min.js',
        ]
        )
        .pipe(concat('layout.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify('Layout js done'))

    gulp.src(
        [
            './bower_components/animate.css/animate.min.css',
            './bower_components/bootstrap/dist/css/bootstrap.min.css',
            './bower_components/bootstrap/dist/css/bootstrap.min.css',
            './bower_components/bootstrap-multiselect/dist/css/bootstrap-multiselect.css',
            './bower_components/bootstrap-submenu/dist/css/bootstrap-submenu.min.css',
            // './bower_components/uikit/dist/css/uikit.min.css',
            './bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
            './bower_components/font-awesome/css/font-awesome.min.css',
            './bower_components/jqueryfiletree/dist/jQueryFileTree.min.css',
            './bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
        ]
        )
        .pipe(concatCss('layout.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify('Layout css done'))
})

gulp.task('files', function() {
    gulp.src('./bower_components/bootstrap/dist/fonts/*.*', {
        base: 'bower_components/bootstrap/dist'
    }).pipe(gulp.dest('./dist'))

    gulp.src('./bower_components/font-awesome/fonts/*.*', {
        base: 'bower_components/font-awesome'
    }).pipe(gulp.dest('./dist'))

    gulp.src('bower_components/jqueryfiletree/dist/images/*.*', {
        base: 'bower_components/jqueryfiletree/dist'
    }).pipe(gulp.dest('./dist'))

    gulp.src('bower_components/malihu-custom-scrollbar-plugin/*.png', {
        base: 'bower_components'
    }).pipe(gulp.dest('./dist'))
})

gulp.task('scss', function() {
    return gulp.src('./dist/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        // .pipe(gulpCompass({css: './dist/css', sass: './scss', image: './dist/images'}))
        // .on('error', function(error) {
        //   console.log(error);
        //   this.emit('end');
        // })
        .pipe(reload({
            stream: true
        }))
        .pipe(notify('Scss Done'))
})

gulp.task('scripts', function() {
    return gulp.src('./dist/js/**/*.js').pipe(reload({
        stream: true
    })).pipe(notify('Scripts Done'))
})

gulp.task('serve', ['scss'], function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        },
        // open: 'external',
        // host: 'myproject.dev',
        // proxy: 'localhost:8080',
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        }
    })
})

gulp.task('watch', function() {
    gulp.watch('./dist/js/*.js', ['scripts'])
    gulp.watch('./dist/scss/**/*.scss', ['scss'])
    gulp.watch('./*.html').on('change', reload)
})

gulp.task('default', ['serve', 'watch'])
