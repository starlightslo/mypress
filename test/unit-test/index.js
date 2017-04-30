const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

// To make lab look like BDD:
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

// Server config
const Server = require('../../src/server/server');
const Config = require('../../src/server/config/config');
const init = require('../../src/server/init');
const server = new Server(Config);

describe('Index Controller - ', () => {
    before((done) => {
        // Start the server
        server.start().then(() => {
            console.info('Start server success.');

            console.info('===== Starting initialize =====');
            const promiseList = [];
            promiseList.push(init.loadSettings(server.self()));
            promiseList.push(init.loadText(server.self()));
            return Promise.all(promiseList);
        }).then((results) => {
            results.forEach((result) => {
                console.info('>>> ' + result);
            });
            console.info('===== Initialize finished =====');
            done();
        }).catch((err) => {
            console.error('Start server failed: ' + err);
        });
    });

    it('Index', (done) => {
        server.self().inject({
            method: 'GET',
            url: '/'
        }, (response) => {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('Ping / Pong', (done) => {
        server.self().inject({
            method: 'GET',
            url: '/ping'
        }, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.equal('pong');
            done();
        });
    });

    after((done) => {
        done();
    });
});
