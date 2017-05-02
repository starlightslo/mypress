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

// Controller
const CommonController = require('../../src/server/app/controllers/common');

// Define data
const DEFAULT = 'default';
const SUPPORTED_LANGUAGE_LIST = ['en', 'tw'];
const DEFAULT_LANGUAGE = 'en';
const enDataObject = {
    data: 'en-data'
};
const twDataObject = {
    data: 'tw-data'
};
const templateDataObject = {
    templateData: 'template-data'
};
const systemDataObject = {
    systemData: 'system-data'
};
const enTemplateDataObject = {
    en: templateDataObject
};
const enSystemDataObject = {
    en: systemDataObject
};

// Mock
const requestMockWithLanguage = {
    params: {},
    server: {
        supportedLanguageList: SUPPORTED_LANGUAGE_LIST,
        defaultLanguage: DEFAULT_LANGUAGE,
        template: DEFAULT,
        text: {
            default: enTemplateDataObject,
            system: enSystemDataObject
        },
        settings: {
            en: enDataObject
        }
    }
};
const requestMockWithoutLanguage = {
    params: {},
    server: {
        supportedLanguageList: SUPPORTED_LANGUAGE_LIST,
        defaultLanguage: DEFAULT_LANGUAGE,
        template: DEFAULT,
        text: {
            default: enTemplateDataObject,
            system: enSystemDataObject
        },
        settings: {
            default: twDataObject
        }
    }
};

describe('Common Controller - ', () => {
    before((done) => {
        done();
    });

    it('Settings with Default Language Data', (done) => {
        CommonController.settings(requestMockWithLanguage, (data) => {
            expect(data.language).to.equal(DEFAULT_LANGUAGE);
            expect(Hoek.deepEqual(data.settings, enDataObject)).to.be.true();
            const text = _.extend(templateDataObject, systemDataObject);
            expect(Hoek.deepEqual(data.text, text)).to.be.true();
            done();
        });
    });

    it('Settings Without Default Language Data', (done) => {
        CommonController.settings(requestMockWithoutLanguage, (data) => {
            expect(data.language).to.equal(DEFAULT_LANGUAGE);
            expect(Hoek.deepEqual(data.settings, twDataObject)).to.be.true();
            const text = _.extend(templateDataObject, systemDataObject);
            expect(Hoek.deepEqual(data.text, text)).to.be.true();
            done();
        });
    });

    after((done) => {
        done();
    });
});
