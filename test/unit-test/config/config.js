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
const devEnv = require('../../../src/server/config/env/dev')();
const testEnv = require('../../../src/server/config/env/test')();
const productionEnv = require('../../../src/server/config/env/production')();

describe('Config - ', () => {
    before((done) => {
        done();
    });

    it('Empty', (done) => {
        const config = require('../../../src/server/config/config')(null);
        expect(config.env).to.equal(Environment.DEV);
        done();
    });

    it('Dev', (done) => {
        const config = require('../../../src/server/config/config')(Environment.DEV);
        expect(config.env).to.equal(Environment.DEV);
        done();
    });

    it('Test', (done) => {
        const config = require('../../../src/server/config/config')(Environment.TEST);
        expect(config.env).to.equal(Environment.TEST);
        done();
    });

    it('Production', (done) => {
        const config = require('../../../src/server/config/config')(Environment.PRODUCTION);
        expect(config.env).to.equal(Environment.PRODUCTION);
        done();
    });

    after((done) => {
        done();
    });
});
