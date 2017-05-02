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

// Data Model
const LanugageDataModel = require('../../../src/server/app/data-models/language');

// Define data
const EN_LANGUAGE = 'en';
const TW_LANGUAGE = 'tw';
const DEFAULT = 'default';
const SUPPORTED_LANGUAGE_LIST = [EN_LANGUAGE, TW_LANGUAGE];
const DEFAULT_LANGUAGE = EN_LANGUAGE;
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
    params: {
        lang: EN_LANGUAGE
    },
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
const requestMockWithoutDefaultLanguage = {
    params: {},
    server: {
        supportedLanguageList: SUPPORTED_LANGUAGE_LIST,
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
const requestMockWitSpecialLanguage = {
    params: {
        lang: 'special'
    },
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

describe('Language Data Model - ', () => {
    before((done) => {
        done();
    });

    it('Set and Get', (done) => {
        const lanugageDataModel = new LanugageDataModel(requestMockWithLanguage);
        lanugageDataModel.setLanguage(EN_LANGUAGE);
        expect(lanugageDataModel.getLanguage()).to.equal(EN_LANGUAGE);
        lanugageDataModel.setLanguage(TW_LANGUAGE);
        expect(lanugageDataModel.getLanguage()).to.equal(TW_LANGUAGE);
        lanugageDataModel.setDefaultLanguage(EN_LANGUAGE);
        expect(lanugageDataModel.getDefaultLanguage()).to.equal(EN_LANGUAGE);
        lanugageDataModel.setDefaultLanguage(TW_LANGUAGE);
        expect(lanugageDataModel.getDefaultLanguage()).to.equal(TW_LANGUAGE);
        done();
    });

    it('Parsing with English Language', (done) => {
        const lanugageDataModel = new LanugageDataModel(requestMockWithLanguage);
        expect(lanugageDataModel.getLanguage()).to.equal(EN_LANGUAGE);
        expect(lanugageDataModel.getDefaultLanguage()).to.equal(DEFAULT_LANGUAGE);
        done();
    });

    it('Parsing without Language', (done) => {
        const lanugageDataModel = new LanugageDataModel(requestMockWithoutLanguage);
        expect(lanugageDataModel.getLanguage()).to.equal(EN_LANGUAGE);
        expect(lanugageDataModel.getDefaultLanguage()).to.equal(DEFAULT_LANGUAGE);
        done();
    });

    it('Parsing without Default Language', (done) => {
        const lanugageDataModel = new LanugageDataModel(requestMockWithoutDefaultLanguage);
        expect(lanugageDataModel.getLanguage()).to.equal(EN_LANGUAGE);
        expect(lanugageDataModel.getDefaultLanguage()).to.equal(DEFAULT_LANGUAGE);
        done();
    });

    it('Parsing with Speical Language', (done) => {
        const lanugageDataModel = new LanugageDataModel(requestMockWitSpecialLanguage);
        expect(lanugageDataModel.getLanguage()).to.equal(EN_LANGUAGE);
        expect(lanugageDataModel.getDefaultLanguage()).to.equal(DEFAULT_LANGUAGE);
        done();
    });

    after((done) => {
        done();
    });
});
