const fs = require('fs');
const path = require('path');

// Load Settings
exports.loadSettings = (server) => {
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
exports.loadText = (server) => {
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
