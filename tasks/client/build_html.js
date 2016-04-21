const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const rev = require('gulp-rev-append')

const path = require('../const').path
const tasks = require('../const').tasks

gulp.task(tasks.CLIENT_VIEWS_DIST, () => {
	return gulp.src(path.HTML)
		.pipe(rev())
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(path.VIEWS_DIST))
})