const _ = require('lodash/core');
const Hoek = require('hoek');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

// To make lab look like BDD:
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

// Define data
const PORT = '123';
const SECRET = '99999';
const DB_TYPE = 'db-type';
const DB_FILENAME = 'db-name';
const DB_NAME = 'db-name';
const DB_USER = 'db-user';
const DB_PASSWORD = 'db-password';
const DB_POOL_MIN = 1;
const DB_POOL_MAX = 99;

describe('Environment - ', () => {
    before((done) => {
        process.env.PORT = PORT;
        process.env.SECRET = SECRET;
        process.env.DB_TYPE = DB_TYPE;
        process.env.DB_FILENAME = DB_FILENAME;
        process.env.DB_NAME = DB_NAME;
        process.env.DB_USER = DB_USER;
        process.env.DB_PASSWORD = DB_PASSWORD;
        process.env.DB_POOL_MIN = DB_POOL_MIN;
        process.env.DB_POOL_MAX = DB_POOL_MAX;
        done();
    });

    it('Dev', (done) => {
        const config = require('../../../src/server/config/env/dev')();
        expect(config.port).to.equal(PORT);
        expect(config.secret).to.equal(SECRET);
        config.dbList.forEach((db) => {
            expect(db.client).to.equal(DB_TYPE);
            expect(db.connection.filename).to.equal(DB_FILENAME);
            expect(db.connection.database).to.equal(DB_NAME);
            expect(db.connection.user).to.equal(DB_USER);
            expect(db.connection.password).to.equal(DB_PASSWORD);
            expect(db.pool.min).to.equal(DB_POOL_MIN);
            expect(db.pool.max).to.equal(DB_POOL_MAX);
        });
        done();
    });

    it('Test', (done) => {
        const config = require('../../../src/server/config/env/test')();
        expect(config.port).to.equal(PORT);
        expect(config.secret).to.equal(SECRET);
        config.dbList.forEach((db) => {
            expect(db.client).to.equal(DB_TYPE);
            expect(db.connection.filename).to.equal(DB_FILENAME);
            expect(db.connection.database).to.equal(DB_NAME);
            expect(db.connection.user).to.equal(DB_USER);
            expect(db.connection.password).to.equal(DB_PASSWORD);
            expect(db.pool.min).to.equal(DB_POOL_MIN);
            expect(db.pool.max).to.equal(DB_POOL_MAX);
        });
        done();
    });

    it('Production', (done) => {
        const config = require('../../../src/server/config/env/production')();
        expect(config.port).to.equal(PORT);
        expect(config.secret).to.equal(SECRET);
        config.dbList.forEach((db) => {
            expect(db.client).to.equal(DB_TYPE);
            expect(db.connection.filename).to.equal(DB_FILENAME);
            expect(db.connection.database).to.equal(DB_NAME);
            expect(db.connection.user).to.equal(DB_USER);
            expect(db.connection.password).to.equal(DB_PASSWORD);
            expect(db.pool.min).to.equal(DB_POOL_MIN);
            expect(db.pool.max).to.equal(DB_POOL_MAX);
        });
        done();
    });

    after((done) => {
        process.env.PORT = null;
        process.env.SECRET = null;
        process.env.DB_TYPE = null;
        process.env.DB_FILENAME = null;
        process.env.DB_NAME = null;
        process.env.DB_USER = null;
        process.env.DB_PASSWORD = null;
        process.env.DB_POOL_MIN = null;
        process.env.DB_POOL_MAX = null;
        done();
    });
});
