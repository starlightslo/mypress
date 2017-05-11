const Joi = require('joi');

exports.register = (server, options, next) => {
    const CommonController = require('../../app/controllers/common');
    const IndexController = require('../../app/controllers/index');
    server.route([{
        method: 'GET',
        path: '/',
        config: {
            pre: [{
                method: CommonController.settings,
                assign: 'settings'
            }],
            handler: IndexController.index,
            auth: false
        }
    }, {
        method: 'GET',
        path: '/{lang}',
        config: {
            pre: [{
                method: CommonController.settings,
                assign: 'settings'
            }],
            handler: IndexController.index,
            auth: false
        }
    }]);

    // Ping - Pong
    server.route({
        method: 'GET',
        path: '/ping',
        config: {
            handler: IndexController.ping,
            auth: false
        }
    });

    // Handling static files
    server.route([
        { method: 'GET', path: '/css/{filename*}', config: { handler: IndexController.cssFile, auth: false } },
        { method: 'GET', path: '/js/{filename*}', config: { handler: IndexController.jsFile, auth: false } },
        { method: 'GET', path: '/fonts/{filename*}', config: { handler: IndexController.fontFile, auth: false } },
        { method: 'GET', path: '/images/{filename*}', config: { handler: IndexController.imageFile, auth: false } },
        { method: 'GET', path: '/views/{filename*}', config: { handler: IndexController.htmlFile, auth: false } }
    ]);
};

exports.register.attributes = {
    name: 'Index Route',
    version: '1.0.0'
};
