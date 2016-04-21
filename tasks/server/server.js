const gulp = require('gulp')
const spawn = require('child_process').spawn

const path = require('../const').path
const tasks = require('../const').tasks

var node

gulp.task(tasks.SERVER, () => {
	if (node) node.kill()
	node = spawn('node', [path.INDEX], {stdio: 'inherit'})
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...')
		}
	})
})


// clean up if an error goes unhandled.
process.on('exit', function() {
	if (node) node.kill()
})