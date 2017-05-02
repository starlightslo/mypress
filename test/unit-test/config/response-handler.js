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
const Environment = require('../../../src/server/app/enums/environment');
const responseHandler = require('../../../src/server/config/handler/response-handler');

// Mock
const requestWithDevMock = {
    payload: 'payload',
    server: {
        config: {
            env: Environment.DEV
        }
    },
    log: {
        error: (data) => {

        },
        info: (data) => {
            expect(data.request.payload).to.exist();
        }
    }
};
const requestWithProductionMock = {
    payload: 'payload',
    server: {
        config: {
            env: Environment.PRODUCTION
        }
    },
    log: {
        error: (data) => {

        },
        info: (data) => {
            expect(data.request.payload).to.not.exist();
        }
    }
};

describe('Response Handler - ', () => {
    before((done) => {
        done();
    });

    it('Error', (done) => {
        responseHandler(400, 'Error', requestWithDevMock, (result) => {
            done();
        });
    });

    it('200 with OK', (done) => {
        responseHandler(200, 'OK', requestWithDevMock, (result) => {
            done();
        });
    });

    it('200 with Object - Dev', (done) => {
        responseHandler(200, {}, requestWithDevMock, (result) => {
            done();
        });
    });

    it('200 with Object - Production', (done) => {
        responseHandler(200, {}, requestWithProductionMock, (result) => {
            done();
        });
    });

    after((done) => {
        done();
    });
});
