const fs = require('fs');
const path = require('path');

const EN_LANGUAGE = 'en';

class LanugageDataModel {
    constructor(request) {
        // Initialize
        this.supportedLanguageList = request.server.supportedLanguageList;
        if (request.server.defaultLanguage) {
            this.setDefaultLanguage(request.server.defaultLanguage);
            this.setLanguage(request.server.defaultLanguage);
        } else {
            this.setDefaultLanguage(EN_LANGUAGE);
            this.setLanguage(EN_LANGUAGE);
        }

        // Set up language
        if (request.params.lang) {
            this.setLanguage(request.params.lang);
        }

        // Store config
        this.config = request.server.config;
    }

    setLanguage(lang) {
        // Only set language when it is in the supported list.
        if (this.supportedLanguageList && this.supportedLanguageList.indexOf(lang) > -1) {
            this.language = lang;
        }
    }

    setDefaultLanguage(lang) {
        this.defaultLanguage = lang;
    }

    getLanguage() {
        return this.language;
    }

    getDefaultLanguage() {
        return this.defaultLanguage;
    }
}

module.exports = LanugageDataModel;
