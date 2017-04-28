// Update with your config settings.

module.exports = {

    dev: {
        client: 'sqlite3',
        connection: {
            filename: './mypress.sqlite3'
        },
        useNullAsDefault: true,
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: './mypress.sqlite3'
        },
        useNullAsDefault: true,
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'mypress2',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
