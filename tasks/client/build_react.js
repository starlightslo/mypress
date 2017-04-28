/* jshint esversion: 6 */

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const rev = require('gulp-rev-append');
const babel = require('gulp-babel');

const path = require('../const').path;
const tasks = require('../const').tasks;

gulp.task(tasks.CLIENT_REACT_DIST, () => {
    return gulp.src([path.CLIENT_JSX])
        .pipe(babel({
            presets: ['es2015', 'react', 'stage-3'],
            ignore: []
        }))
        .on('error', (e) => {
            console.error(e);
            this.emit('end');
        })
        .pipe(gulp.dest(path.CLIENT_JS_DIST));
});
