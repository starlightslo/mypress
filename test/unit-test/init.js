const _ = require('lodash/core');
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

// Define data
const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGE_LIST = 'supported-language-list';
const TEMPLATE = 'template';
const SETTINGS = 'settings';
const JS_FILE = 'js-file';
const OTHER_FILE = 'other-file';

// Mock
const proxyquire = require('proxyquire');
const settingsModelMock = class SettingModelMock {
    constructor(db) {
        this.db = db;
    }

    get() {
        return new Promise((resolve, reject) => {
            resolve({
                defaultLanguage: DEFAULT_LANGUAGE,
                supportedLanguageList: SUPPORTED_LANGUAGE_LIST,
                template: TEMPLATE,
                settings: SETTINGS
            });
        });
    }
};
const settingsModelWithErrorMock = class SettingModelMock {
    constructor(db) {
        this.db = db;
    }

    get() {
        return new Promise((resolve, reject) => {
            reject('error');
        });
    }
};
const fsMock = {
    stat: (path, callback) => {
        if (path.indexOf('error') >= 0) {
            callback('err', null);
        } else {
            return callback(null, {});
        }
    },
    readdirSync: (path) => {
        return [JS_FILE, OTHER_FILE];
    }
};
const pathMock = {
    parse: (file) => {
        switch (file) {
            case JS_FILE:
                return {
                    ext: '.js',
                    name: 'jsfile'
                };
            case OTHER_FILE:
                return {
                    ext: '.other',
                    name: 'otherfile'
                };
        }
    }
};
const serverMock = {
    app: {
        db: {
            mypress: {

            }
        }
    },
    config: {
        root: 'root',
        path: {
            language: 'language'
        }
    }
};
const serverWithErrorMock = {
    app: {
        db: {

        }
    },
    config: {
        root: 'root',
        path: {
            language: 'error'
        }
    }
};

describe('Initialize - ', () => {
    before((done) => {
        done();
    });

    it('Load Settings', (done) => {
        const init = proxyquire('../../src/server/init', {
            './app/models/settings': settingsModelMock
        });
        init.loadSettings(serverMock).then((data) => {
            expect(serverMock.defaultLanguage).to.equal(DEFAULT_LANGUAGE);
            expect(serverMock.supportedLanguageList).to.equal(SUPPORTED_LANGUAGE_LIST);
            expect(serverMock.template).to.equal(TEMPLATE);
            expect(serverMock.settings).to.equal(SETTINGS);
            done();
        });
    });

    it('Load Settings with Error', (done) => {
        const init = proxyquire('../../src/server/init', {
            './app/models/settings': settingsModelWithErrorMock
        });
        init.loadSettings(serverMock).then((data) => {

        }).catch((err) => {
            done();
        });
    });

    it('Load Settings with Empty Database', (done) => {
        const init = proxyquire('../../src/server/init', {
            './app/models/settings': settingsModelMock
        });
        init.loadSettings(serverWithErrorMock).then((data) => {

        }).catch((err) => {
            done();
        });
    });

    it('Load Text with Other Ext and Wrong Type', (done) => {
        const init = proxyquire('../../src/server/init', {
            'fs': fsMock,
            'path': pathMock
        });
        init.loadText(serverMock).then((data) => {
            done();
        });
    });

    it('Load Text with Error', (done) => {
        const init = proxyquire('../../src/server/init', {
            'fs': fsMock,
            'path': pathMock
        });
        init.loadText(serverWithErrorMock).then((data) => {

        }).catch((err) => {
            done();
        });
    });

    after((done) => {
        done();
    });
});
