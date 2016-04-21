const gulp = require('gulp')
const minifyCSS = require('gulp-minify-css')

const path = require('../const').path
const tasks = require('../const').tasks

gulp.task(tasks.CLIENT_CSS_DIST, () => {
	return gulp.src(path.CSS)
		.pipe(minifyCSS())
		.pipe(gulp.dest(path.DIST))
})