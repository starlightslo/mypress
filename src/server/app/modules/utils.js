const fs = require('fs');

class Utils {
    static ensureExists(path, mask) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, mask, (err) => {
                if (err) {
                    if (err.code === 'EEXIST') { resolve(); }
                    else { reject(err); }
                } else {
                    resolve();
                }
            });
        });
    }

    static randomString(len) {
        const DEFAULT_LENGTH = 32;
        if (len === null || len === undefined || typeof len === 'object') {
            len = DEFAULT_LENGTH;
        }
        if (typeof len === 'string' && len.trim().length === 0) {
            len = DEFAULT_LENGTH;
        }
        if (isNaN(Number(len))) {
            len = DEFAULT_LENGTH;
        }
        return require('crypto').randomBytes(len).toString('hex');
    }
}

/**
 * Exports
 */
module.exports = Utils;
