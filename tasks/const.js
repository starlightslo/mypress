exports.path = {
	ALL_JS: './**/*.js',

	// Client
	DIST: './public/',
	JS: './src/**/*.js',
	CSS: './src/**/*.css',
	IMAGE: './src/**/images/*',
	FONT: './src/**/fonts/*',

	// Server
	APP: './app/**/*.js',
	CONFIG: './config/**/*.js',
	TEST: './test/**/*.js',
	INDEX: './index.js',
	HTML: './src/**/*.html',
	VIEWS_DIST: './app/'
};

exports.tasks = {
	CLIENT_CSS_DIST: 'client.build_css:dist',
	CLIENT_JS_DIST: 'client.build_js:dist',
	CLIENT_FONT_DIST: 'client.fonts:dist',
	CLIENT_VIEWS_DIST: 'client.views:dist',
	CLIENT_IMAGE_DIST: 'client.imgs:dist',
	SERVER: 'server',
	WATCH: 'watch',
	JSHINT: 'jshint'
};