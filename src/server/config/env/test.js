/**
 * Expose
 */
module.exports = {
    port: process.env.PORT || 8081,
    secret: '123456789012345678901234567890',
    dbList: [{
        name: 'mypress',
        client: 'sqlite3',
        connection: {
            filename: './mypress.sqlite3'
        },
        useNullAsDefault: true
    }],
    logConfig: {
        name: 'MyPress',
        env: 'test',
        streams: [{
            level: 'trace',
            stream: process.stdout
        }, {
            level: 'debug',
            path: 'logs/debug.log'
        }, {
            level: 'info',
            path: 'logs/info.log'
        }, {
            level: 'warn',
            path: 'logs/warn.log'
        }, {
            level: 'error',
            path: 'logs/error.log'
        }, {
            level: 'fatal',
            path: 'logs/fatal.log'
        }]
    }
};
