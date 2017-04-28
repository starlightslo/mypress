
exports.index = (request, reply) => {
    reply.view('index', {});
};

exports.ping = (request, reply) => {
    reply('pong');
};

exports.cssFile = {
    directory: {
        path: './css',
        redirectToSlash: true,
        index: true
    }
};

exports.jsFile = {
    directory: {
        path: './js',
        redirectToSlash: true,
        index: true,
        listing: true
    }
};

exports.imageFile = {
    directory: {
        path: './images',
        redirectToSlash: true,
        index: true
    }
};

exports.fontFile = {
    directory: {
        path: './fonts',
        redirectToSlash: true,
        index: true
    }
};

exports.htmlFile = {
    directory: {
        path: './views',
        redirectToSlash: true,
        index: true
    }
};
