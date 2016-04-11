'use strict'

const fs = require('fs')

class Utils {
	static ensureExists(path, mask, cb) {
	    if (typeof mask == 'function') {
	        cb = mask
	        mask = '0777'
	    }
	    fs.mkdir(path, mask, function(err) {
	        if (err) {
	            if (err.code == 'EEXIST') cb(null)
	            else cb(err)
	        } else cb(null)
	    })
	}

	static randomString(len) {
		const DEFAULT_LENGTH = 32
		if (len === null || len === undefined || typeof len === 'object') {
			len = DEFAULT_LENGTH
		}
		if (typeof len === 'string' && len.trim().length == 0) {
			len = DEFAULT_LENGTH
		}
		if (isNaN(Number(len))) {
			len = DEFAULT_LENGTH
		}
		return require('crypto').randomBytes(len).toString('hex')
	}
}

/**
 * Exports
 */
module.exports = Utils