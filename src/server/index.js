const fs = require('fs');
const path = require('path');

const Config = require('./config/config');
const Utils = require('./app/modules/utils');
const Server = require('./server');

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
        promiseList.push(loadSettings(server.self()));
        promiseList.push(loadText(server.self()));
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

// Load Settings
const loadSettings = (server) => {
    return new Promise((resolve, reject) => {
        if (server.app.db.mypress) {
            const SettingsModel = require('./app/models/settings');
            const settingsModel = new SettingsModel(server.app.db.mypress);
            settingsModel.get().then((data) => {
                server.defaultLanguage = data.defaultLanguage;
                server.template = data.template;
                server.supportedLanguageList = data.supportedLanguageList;
                server.settings = data.settings;
                resolve('Loading settings successful.');
            }).catch((err) => {
                reject(err);
            });
        } else {
            reject('Does not have mypress database.');
        }
    });
};

// Load Text
const loadText = (server) => {
    return new Promise((resolve, reject) => {
        const text = {};
        server.text = text;
        fs.stat(path.join(server.config.root, server.config.path.language), (err, stats) => {
            if (!err) {
                fs.readdirSync(path.join(server.config.root, server.config.path.language)).forEach((file) => {
                    const metaData = path.parse(file);
                    if (metaData.ext === '.js') {
                        // Loading text data with language
                        if (metaData.name.charAt(metaData.name.length - 3) === '_') {
                            const name = metaData.name.substring(0, metaData.name.length - 3);
                            const language = metaData.name.substring(metaData.name.length - 2);
                            if (!text[name]) {
                                text[name] = {};
                            }
                            text[name][language] = require(server.config.path.language + '/' + file);
                        }
                    }
                });
                resolve('Loading text finished.');
            } else {
                reject(err);
            }
        });
    });
};
