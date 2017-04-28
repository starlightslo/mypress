const TEST = 'test';
const DEV = 'dev';
const PRODUCTION = 'production';

class Environment {
    static get TEST() { return TEST; }
    static get DEV() { return DEV; }
    static get PRODUCTION() { return PRODUCTION; }
}

module.exports = Environment;
