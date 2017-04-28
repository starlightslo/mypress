/*jshint esversion: 6 */

const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');

const path = require('../const').path;
const tasks = require('../const').tasks;

gulp.task(tasks.CLIENT_CSS_DIST, () => {
    return gulp.src(path.CSS)
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.CLIENT_PUBLIC_DIST));
});
