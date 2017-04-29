const packageJSON = require('../../../package.json');
const extend = require('util')._extend;

const dev = require('./env/dev');
const test = require('./env/test');
const production = require('./env/production');

const DEV_ENV = 'dev';
const APP = 'MyPress';

/**
 * Default config
 */
const defaults = {
    app: APP,
    appName: APP + ' - ' + process.env.NODE_ENV || DEV_ENV,
    version: packageJSON.version,
    language: 'en',
    saltLength: 10,
    tokenExpiryTime: 10 * 60,
    delayResponse: 3000,
    maxFailedCount: 5,
    blockTime: 15 * 60 * 1000,
    root: require('path').join(__dirname, '..'),
    path: {
        public: require('path').join(__dirname, '../../../out/client/public'),
        views: require('path').join(__dirname, '../../../out/client/views'),
        routes: './config/routes',
        plugins: './app/plugins',
        strategy: './app/strategies',
        language: './config/languages'
    },
    env: process.env.NODE_ENV || DEV_ENV
};

/**
 * Expose
 */
module.exports = {
    dev: extend(dev, defaults),
    test: extend(test, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || DEV_ENV];
