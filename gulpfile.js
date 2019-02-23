/*
    gulp.task
    gulp.src
    gulp.dest
    gulp.watch
    gulp.series
*/

var gulp = require('gulp');
//var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-cleancss');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

var config = {
    srcDir: 'src',

    htmlOut: 'src/**/*.html',

    scssOut: 'src/scss/**/*.scss',

    cssIn: 'src/css',
    cssOut: 'src/css/**/*.css',
    cssInDist: 'dist/css',
    cssNameDist: 'style.css',

    jsOut: 'src/js/**/*.js',
    jsInDist: 'dist/js',
    jsNameDist: 'script.js',

    imgOut: 'src/img/**/*.{jpg,jpeg,png,svg,gif}',
    imgInDist: 'dist/img'
}

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});

gulp.task('watch', function() {
    browserSync({
        server: config.srcDir
    });

    gulp.watch(config.htmlOut, gulp.series('reload'));
    gulp.watch(config.scssOut, gulp.series('sass'));
    gulp.watch(config.jsOut, gulp.series('reload'));
})

gulp.task('sass', function() {
    return gulp.src(config.scssOut)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.cssIn))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src(config.cssOut)
        .pipe(concat(config.cssNameDist))
        .pipe(cleancss())
        .pipe(gulp.dest(config.cssInDist));
})

gulp.task('js', function() {
    return gulp.src(config.jsOut)
        .pipe(concat(config.jsNameDist))
        .pipe(uglify())
        .pipe(gulp.dest(config.jsInDist));
})

gulp.task('img', function() {
    return gulp.src(config.imgOut)
        .pipe(changed(config.imgInDist))
        .pipe(imagemin())
        .pipe(gulp.dest(config.imgInDist));
})

gulp.task('build', gulp.series('css', 'js', 'img'));

gulp.task('serve', gulp.series('sass', 'watch'));

gulp.task('default', gulp.series('serve'));
