const Config = require('./config/config');
const Utils = require('./app/modules/utils');
const Server = require('./server');

const server = new Server(Config);

// Create folders
const promiseList = [];
promiseList.push(Utils.ensureExists('logs', '0744'));
promiseList.push(Utils.ensureExists(Config.path.public, '0777'));
Promise.all(promiseList).then(() => {
    const server = new Server(Config);

    // Start the server
    server.start().then(() => {
        console.info(Config.appName + ' is running on port: ' + Config.port);
        console.info(Config.app + ' version: ' + Config.version);
    }).catch((err) => {
        console.error('Start server failed: ' + err);
    });
}).catch((err) => {
    console.error('Create folder error', err);
});
