const Config = require('./config/config')(process.env.NODE_ENV);
const Utils = require('./app/modules/utils');
const Server = require('./server');
const init = require('./init');

const server = new Server(Config);

// Create folders
let promiseList = [];
promiseList.push(Utils.ensureExists('logs', '0744'));
promiseList.push(Utils.ensureExists(Config.path.public, '0777'));
Promise.all(promiseList).then(() => {
    const server = new Server(Config);

    // Start the server
    server.start().then(() => {
        console.info(Config.appName + ' is running on port: ' + Config.port);
        console.info(Config.app + ' version: ' + Config.version);

        console.info('===== Starting initialize =====');
        promiseList = [];
        promiseList.push(init.loadSettings(server.self()));
        promiseList.push(init.loadText(server.self()));
        return Promise.all(promiseList);
    }).then((results) => {
        results.forEach((result) => {
            console.info('>>> ' + result);
        });
        console.info('===== Initialize finished =====');
    }).catch((err) => {
        console.error('Start server failed: ' + err);
    });
}).catch((err) => {
    console.error('Create folder error', err);
});
