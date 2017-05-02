const _ = require('lodash/core');
const LanugageDataModel = require('../data-models/language');

const DEFAULT = 'default';
const SYSTEM = 'system';

exports.settings = (request, reply) => {
    const lanugageDataModel = new LanugageDataModel(request);
    let text = {};
    let settings = {};

    // Loading system and template text
    text = _.extend(text, request.server.text[SYSTEM][lanugageDataModel.getLanguage()]);
    text = _.extend(text, request.server.text[request.server.template][lanugageDataModel.getLanguage()]);

    // Loading settings
    settings = request.server.settings[lanugageDataModel.getLanguage()];
    if (!settings) {
        settings = request.server.settings[DEFAULT];
    }

    const data = {
        language: lanugageDataModel.getLanguage(),
        text: text,
        settings: settings
    };
    return reply(data);
};
