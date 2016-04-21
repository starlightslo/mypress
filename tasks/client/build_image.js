const gulp = require('gulp')
const imagemin = require('gulp-imagemin')

const path = require('../const').path
const tasks = require('../const').tasks

gulp.task(tasks.CLIENT_IMAGE_DIST, () => {
	return gulp.src(path.IMAGE)
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest(path.DIST))
})