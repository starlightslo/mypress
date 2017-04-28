/**
 * Expose
 */
module.exports = {
    port: process.env.PORT || 8080,
    secret: '123456789012345678901234567890',
    dbList: [{
        name: 'mypress',
        client: 'postgresql',
        connection: {
            database: 'mypress',
            user: 'postgres',
            password: ''
        },
        pool: {
            min: 2,
            max: 10
        }
    }],
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        db: 0,
        pass: ''
    },
    logConfig: {
        name: 'MyPress',
        env: 'production',
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
