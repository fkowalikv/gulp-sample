/*
    gulp.task
    gulp.src
    gulp.dest
    gulp.watch
    gulp.series
*/

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-cleancss');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});

gulp.task('watch', function() {
    browserSync({
        server: 'src'
    });

    gulp.watch('src/**/*.html', gulp.series('reload'));
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
})

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css'));
})

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

gulp.task('serve', gulp.series('sass', 'watch'));

gulp.task('default', gulp.series('serve'));
