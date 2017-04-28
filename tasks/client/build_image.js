/*jshint esversion: 6 */

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

const path = require('../const').path;
const tasks = require('../const').tasks;

gulp.task(tasks.CLIENT_IMAGE_DIST, () => {
    // Copy the images at first to prevent compress failed
    gulp.src(path.IMAGE)
        .pipe(gulp.dest(path.CLIENT_PUBLIC_DIST));

    // Compress images
    path.IMAGELIST.forEach((imagePath) => {
        gulp.src(imagePath)
        .pipe(imagemin(
            [imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()],
            { verbose: true }
        ))
        .pipe(gulp.dest(path.CLIENT_PUBLIC_DIST));
    });
});
