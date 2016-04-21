const gulp = require('gulp')

const path = require('../const').path
const tasks = require('../const').tasks

gulp.task(tasks.CLIENT_FONT_DIST, () => {
	return gulp.src(path.FONT)
		.pipe(gulp.dest(path.DIST))
})