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
}

/**
 * Exports
 */
module.exports = Utils