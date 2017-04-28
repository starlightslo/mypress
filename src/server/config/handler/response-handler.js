const Environment = require('../../app/enums/environment');

const errorLog = (code, result, req) => {
    req.log.error({
        code: code,
        result: result,
        request: {
            params: req.params,
            payload: req.payload,
            pre: req.pre,
            query: req.query,
            header: req.headers,
            path: req.path,
            method: req.method
        }
    });
};

const infoLog = (code, result, req) => {
    // Ignore the type of result is string
    if (typeof result === 'string') return;

    const environment = req.server.config.env;
    if (environment !== Environment.PRODUCTION) {
        req.log.info({
            code: code,
            result: result,
            request: {
                params: req.params,
                payload: req.payload,
                pre: req.pre,
                query: req.query,
                header: req.headers,
                path: req.path,
                method: req.method
            }
        });
    } else {
        req.log.info({
            code: code,
            result: result,
            request: {
                params: req.params,
                pre: req.pre,
                query: req.query,
                header: req.headers,
                path: req.path,
                method: req.method
            }
        });
    }
};

const ResponseHandler = (code, result, request, reply) => {
    // Log error
    if (code !== 200) {
        errorLog(code, result, request);
    } else {
        infoLog(code, result, request);
    }

    // Hidding the response error on production


    // Reply to client
    return reply(result).code(code);
};

module.exports = ResponseHandler;
