/* jshint esversion: 6 */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const path = require('../const').path;
const tasks = require('../const').tasks;

gulp.task(tasks.SERVER, [], () => {
    nodemon({
        script: path.INDEX,
        ext: 'js',
        ignore: [],
        watch: [path.SERVER_SRC]
    }).on('restart', () => {
        console.info('restarted!');
    });
});
