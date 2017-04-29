/* jshint esversion: 6 */

const gulp = require('gulp');
const webpack = require('webpack-stream');

const path = require('../const').path;
const tasks = require('../const').tasks;

gulp.task(tasks.CLIENT_REACT_DIST, () => {
    return webpack(require('../../web.config.js'))
        .pipe(gulp.dest(path.CLIENT_JS_DIST));
});
