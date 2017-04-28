/*jshint esversion: 6 */

exports.path = {
    // Client
    CLIENT_PUBLIC_DIST: './out/client/public',
    CLIENT_VIEW_DIST: './out/client/public/views',
    CLIENT_JS: './src/client/**/*.js',
    CLIENT_JS_DIST: './src/client/js',
    CSS: './src/client/**/*.css',
    IMAGE: './src/client/**/images/*',
    IMAGELIST: [
        './src/client/**/images/*.png',
        './src/client/**/images/*.gif',
        './src/client/**/images/*.jpg',
        './src/client/**/images/*.jepg',
        './src/client/**/images/*.svg'
    ],
    FONT: './src/client/**/fonts/*',
    JS: './src/client/**/js/*.js',
    HTML: './src/client/html/**/*.html',
    VIEW: './src/client/views/**/*.js',
    EJS: './src/client/**/*.ejs',
    JSX: './src/client/jsx/*.js',
    BUNDLE_FILE: 'out/client/public/js/bundle.js',
    CLIENT_ENTRY: './src/client/views/client.js',

    // Server
    SERVER_SRC: './src/server',
    SERVER_JS: './src/server/**/*.js',
    INDEX: './src/server/index.js'
};

exports.tasks = {
    CLIENT_CSS_DIST: 'client.build_css:dist',
    CLIENT_JS_DIST: 'client.build_js:dist',
    CLIENT_FONT_DIST: 'client.fonts:dist',
    CLIENT_VIEWS_DIST: 'client.views:dist',
    CLIENT_REACT_DIST: 'client.react:dist',
    CLIENT_EJS_DIST: 'client.ejs:dist',
    CLIENT_IMAGE_DIST: 'client.imgs:dist',
    CLIENT_WEBPACK_DIST: 'client.build_webpack:dist',
    SERVER_JS_DIST: 'server.build_js:dist',
    SERVER_NODEMON_DIST: 'server.nodemon:dist',
    SERVER: 'server',
    BROWSER: 'browser',
    WATCH: 'watch',
    JSHINT: 'jshint',
    BUILD: 'build'
};
