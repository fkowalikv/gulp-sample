'use strict';

import gulp from 'gulp';
//import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-cleancss';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';

import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import util from 'gulp-util';

const config = {
    srcDir: 'src',

    htmlOut: 'src/**/*.html',
    htmlInDist: 'dist/',

    scssOut: 'src/scss/**/*.scss',
    cssIn: 'src/css',
    cssName: 'style.css',
    cssOut: 'src/css/**/*.css',
    cssInDist: 'dist/css',
    cssNameDist: 'style.css',

    jsOutDev: 'src/js/main.js',
    jsNameDev: 'script.js',
    jsIn: 'src/js',
    jsOutWatch: ['src/js/**/*.js', '!src/js/script.js'],
    jsOut: 'src/js/script.js',
    jsInDist: 'dist/js',

    imgOut: 'src/img/**/*.{jpg,jpeg,png,svg,gif}',
    imgInDist: 'dist/img'
}

gulp.task('reload', (done) => {
    browserSync.reload();
    done();
});

gulp.task('watch', () => {
    browserSync({
        server: config.srcDir
    });

    gulp.watch(config.htmlOut, gulp.series('reload'));
    gulp.watch(config.scssOut, gulp.series('sass'));
    gulp.watch(config.jsOutWatch, gulp.series('js-dev'));
})

gulp.task('sass', () => {
    return gulp.src(config.scssOut)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(concat(config.cssName))
        .pipe(gulp.dest(config.cssIn))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    let b = browserify({
        entries: config.jsOutDev,
        debug: true
    });

    b.transform(babelify);

  return b.bundle()
    .pipe(source(config.jsNameDev))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .on('error', util.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.jsIn))
    .pipe(browserSync.stream());
})

gulp.task('css', () => {
    return gulp.src(config.cssOut)
        .pipe(concat(config.cssNameDist))
        .pipe(cleancss())
        .pipe(gulp.dest(config.cssInDist));
})

gulp.task('copyJs', () => {
    return gulp.src(config.jsOut)
        .pipe(uglify())
        .pipe(gulp.dest(config.jsInDist));
})

gulp.task('copyHtml', () => {
  return gulp.src(config.htmlOut)
    .pipe(gulp.dest(config.htmlInDist));
});

gulp.task('img', () => {
    return gulp.src(config.imgOut)
        .pipe(changed(config.imgInDist))
        .pipe(imagemin())
        .pipe(gulp.dest(config.imgInDist));
});

gulp.task('build', gulp.series('sass', 'css', 'js', 'copyJs', 'img', 'copyHtml'));

gulp.task('serve', gulp.series('sass', 'js', 'watch'));

gulp.task('default', gulp.series('serve'));
