const Joi = require('joi');

exports.register = (server, options, next) => {
    const IndexController = require('../../app/controllers/index');
    server.route([{
        method: 'GET',
        path: '/',
        handler: IndexController.index
    },{
        method: 'GET',
        path: '/ping',
        handler: IndexController.ping
    }]);

    // Handling static files
    server.route([
        { method: 'GET', path: '/css/{filename*}', handler: IndexController.cssFile },
        { method: 'GET', path: '/js/{filename*}', handler: IndexController.jsFile },
        { method: 'GET', path: '/fonts/{filename*}', handler: IndexController.fontFile },
        { method: 'GET', path: '/images/{filename*}', handler: IndexController.imageFile },
        { method: 'GET', path: '/views/{filename*}', handler: IndexController.htmlFile }
    ]);
};

exports.register.attributes = {
    name: 'Index Route',
    version: '1.0.0'
};
