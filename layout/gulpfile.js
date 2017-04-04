var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass');
var gulpCompass = require('gulp-compass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('js_plugins', function() {
    return gulp.src(
      [
        './bower_components/jquery/dist/jquery.min.js',
        // './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/uikit/dist/js/uikit.min.js',
        './bower_components/uikit/dist/js/uikit-icons.min.js',
        './bower_components/vue/dist/vue.min.js',
        './bower_components/holderjs/holder.min.js',
      ]
    )
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(notify("JS Plugins Done"));
});

gulp.task('css_plugins', function() {
    return gulp.src(
      [
        // './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/uikit/dist/css/uikit.min.css',
      ]
    )
    .pipe(concatCss("plugins.css"))
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify("CSS Plugins Done"));
});

gulp.task('bootstrap', function() {
    gulp.src('./bower_components/bootstrap/dist/fonts/*.*', {base: 'bower_components/bootstrap/dist'}).pipe(gulp.dest('./dist'));
});

gulp.task('files_plugins', ['bootstrap'], function() {
    gulp.src('').pipe(notify("Files Plugins Done"));
});

gulp.task('scss', function() {
    return gulp.src('./dist/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    // .pipe(gulpCompass({css: './dist/css', sass: './scss', image: './dist/images'}))
    // .on('error', function(error) {
    //   console.log(error);
    //   this.emit('end');
    // })
    .pipe(reload({stream: true}))
    .pipe(notify("Scss Done"));
});

gulp.task('scripts', function() {
    return gulp.src('./dist/js/**/*.js').pipe(reload({stream: true})).pipe(notify("Scripts Done"));
});

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
    });
});

gulp.task('watch', function() {
    gulp.watch('./dist/js/*.js', ['scripts']);
    gulp.watch('./dist/scss/**/*.scss', ['scss']);
    gulp.watch("./*.html").on('change', reload);
});

gulp.task('default', ['serve', 'watch']);
