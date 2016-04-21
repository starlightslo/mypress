const gulp = require('gulp')
const uglify = require('gulp-uglify')

const path = require('../const').path
const tasks = require('../const').tasks

gulp.task(tasks.CLIENT_JS_DIST, () => {
	return gulp.src(path.JS)
		.pipe(uglify())
		.pipe(gulp.dest(path.DIST))
})