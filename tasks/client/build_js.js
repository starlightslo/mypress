/*jshint esversion: 6 */

const gulp = require('gulp');
const uglify = require('gulp-uglify');

const path = require('../const').path;
const tasks = require('../const').tasks;

gulp.task(tasks.CLIENT_JS_DIST, () => {
    return gulp.src(path.JS)
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(path.CLIENT_PUBLIC_DIST));
});
