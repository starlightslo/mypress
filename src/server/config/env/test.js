/**
 * Expose
 */
module.exports = () => {
    return {
        port: process.env.PORT || 8081,
        secret: process.env.SECRET || '123456789012345678901234567890',
        dbList: [{
            name: 'mypress',
            client: process.env.DB_TYPE || 'sqlite3',
            connection: {
                filename: process.env.DB_FILENAME || './mypress.sqlite3',
                database: process.env.DB_NAME || 'mypress',
                user: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASSWORD || ''
            },
            pool: {
                min: process.env.DB_POOL_MIN || 2,
                max: process.env.DB_POOL_MAX || 10
            },
            useNullAsDefault: true
        }],
        logConfig: {
            name: 'MyPress',
            env: 'test',
            streams: []
        }
    };
};
