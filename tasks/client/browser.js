/* jshint esversion: 6 */


const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const path = require('../const').path;
const tasks = require('../const').tasks;

const webpackConfig = require('../../web.config.js');
const bundler = webpack(webpackConfig);

gulp.task(tasks.BROWSER, [], () => {
    browserSync({
        proxy: {
            target: 'localhost:8080',
            middleware: [
                webpackDevMiddleware(bundler, {
                    // IMPORTANT: dev middleware can't access config, so we should
                    // provide publicPath by ourselves
                    publicPath: webpackConfig.output.publicPath,

                    // pretty colored output
                    stats: { colors: true }

                    // for other settings see
                    // http://webpack.github.io/docs/webpack-dev-middleware.html
                }),

                // bundler should be the same as above
                webpackHotMiddleware(bundler)
            ]
        },
        files: [{
            match: [path.CLIENT_PUBLIC_DIST],
            options: {
                ignored: path.BUNDLE_FILE
            }
        }],
        port: 9998,
        ui: {
            port: 9999
        }
    });
});
