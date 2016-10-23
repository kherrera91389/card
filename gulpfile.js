var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var path = require('path');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
// Миникация css
gulp.task('minify-css', function() {
    return gulp.src('./css/*.css').pipe(cleanCSS({
        compatibility: 'ie10'
    })).pipe(gulp.dest('./css/'));
});
gulp.task('autoprefixer', function() {
    return gulp.src('./css/style.css').pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    })).pipe(gulp.dest('./css/style.css'));
});
// Watch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./css/style.css', ['minify-css']);
    gulp.watch('./css/style.css', ['autoprefixer']);
});
// Локальный сервер для разработки

gulp.task('serve', function(event) {
    connect.server({
        root: './',
        port: 1987,
        livereload: true
    });
});

gulp.task('default', ['watch', 'serve']); // Default will run the 'entry' watch task