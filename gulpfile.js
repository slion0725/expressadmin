var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');

gulp.task('scripts', function() {
    return gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/what-input/dist/what-input.min.js', 'bower_components/foundation-sites/dist/js/foundation.js', 'bower_components/foundation-sites/dist/js/plugins/foundation.abide.js']).pipe(concat('all.js')).pipe(gulp.dest('public/dist/'));
});

gulp.task('styles', function() {
    return gulp.src(['bower_components/foundation-sites/dist/css/foundation.css']).pipe(concatCss("all.css")).pipe(gulp.dest('public/dist/'));
});
