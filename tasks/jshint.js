const gulp = require('gulp')
const jshint = require('gulp-jshint')

const path = require('./const').path
const tasks = require('./const').tasks

gulp.task(tasks.JSHINT, () => {
	gulp.src(path.ALL_JS)
	.pipe(jshint())
})