const Hoek = require('hoek');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

// To make lab look like BDD:
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

// Server config
const SettingsModel = require('../../../src/server/app/models/settings');
const ErrorMessage = require('../../../src/server/app/enums/error-message');

// Define data
const SettingsData = require('../../data/settings.json');
const SettingsWithSpecialLanguageData = require('../../data/settings_with_special_lang.json');
const NO_DATA = 'no-data';
const ERROR = 'error';
const NORMAL = 'normal';
const SPECIAL_LANG = 'special-lang';

// Variables
let flag = NO_DATA;

// Mock
const dbMock = (table) => {
    const _this = {
        first: () => {
            return new Promise((resolve, reject) => {
                switch (flag) {
                    case NO_DATA:
                        resolve(null);
                        flag = ERROR;
                        break;
                    case ERROR:
                        reject(ERROR);
                        flag = NORMAL;
                        break;
                    case NORMAL:
                        resolve(SettingsData);
                        flag = SPECIAL_LANG;
                        break;
                    case SPECIAL_LANG:
                        resolve(SettingsWithSpecialLanguageData);
                        break;
                }
            });
        }
    };
    return _this;
};

describe('Settings Model - ', () => {
    before((done) => {
        done();
    });

    it('Null db', (done) => {
        const settingsModel = new SettingsModel(null);
        settingsModel.get().then((data) => {

        }).catch((err) => {
            expect(err).to.equal(ErrorMessage.NO_DATABASE);
            done();
        });
    });

    it('No data', (done) => {
        const settingsModel = new SettingsModel(dbMock);
        settingsModel.get().then((data) => {

        }).catch((err) => {
            expect(err).to.equal(ErrorMessage.NO_DATA_IN_TABLE);
            done();
        });
    });

    it('Error', (done) => {
        const settingsModel = new SettingsModel(dbMock);
        settingsModel.get().then((data) => {

        }).catch((err) => {
            expect(err).to.equal(ERROR);
            done();
        });
    });

    it('Normal', (done) => {
        const settingsModel = new SettingsModel(dbMock);
        settingsModel.get().then((data) => {
            expect(data.defaultLanguage).to.equal(SettingsData.default_language);
            expect(data.template).to.equal(SettingsData.template);
            expect(Hoek.deepEqual(data.supportedLanguageList, JSON.parse(SettingsData.language))).to.be.true();
            data.supportedLanguageList.forEach((language) => {
                expect(data.settings[language]).to.be.an.object();
            });
            done();
        }).catch((err) => {
            console.error(err);
        });
    });

    it('With Special Language', (done) => {
        const settingsModel = new SettingsModel(dbMock);
        settingsModel.get().then((data) => {
            expect(data.defaultLanguage).to.equal(SettingsWithSpecialLanguageData.default_language);
            expect(data.template).to.equal(SettingsWithSpecialLanguageData.template);
            expect(Hoek.deepEqual(data.supportedLanguageList, JSON.parse(SettingsWithSpecialLanguageData.language))).to.be.true();
            data.supportedLanguageList.forEach((language) => {
                expect(data.settings[language]).to.be.an.object();
            });
            done();
        }).catch((err) => {
            console.error(err);
        });
    });

    after((done) => {
        done();
    });
});
