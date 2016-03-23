'use strict'

const config = require('../../config/config')

let progressList = {}
let blockList = {}

/**
 * This prevent parallel login mechanism should be changed to use Redis database on the production server.
 * Otherwise, this mechanism can not handled if the process is forked.
 */
class ParallelLogin {
	constructor() {

	}

	static attemptLogin(ip) {
		// Checking is the ip in the process
		if (progressList[ip]) {
			return false
		}

		// Checking is the ip in the block list
		if (blockList[ip] && blockList[ip].count >= config.maxFailedCount) {
			return false
		}

		progressList[ip] = true
		return true
	}

	static attemptFailedLogin(ip) {
		// If there is the first failed
		if (!blockList[ip]) {
			blockList[ip] = {
				count: 0
			}
		}
		blockList[ip].count++
		
		// If fail time is exceed, block ip
		if (blockList[ip].count >= config.maxFailedCount) {
			// Clear timeout
			if (blockList[ip].timeout) {
				clearTimeout(blockList[ip].timeout)
			}

			// Set new timeout
			blockList[ip].timeout = setTimeout(() => {
				delete blockList[ip]
			}, config.blockTime)
		}

		// Delete from progress list
		delete progressList[ip]
	}

	static loginSuccessful(ip) {
		// Delete from block list
		if (blockList[ip]) {
			if (blockList[ip].timeout) {
				clearTimeout(blockList[ip].timeout)
			}
			delete blockList[ip]
		}

		// Delete from progress list
		delete progressList[ip]
	}
}


/**
 * Exports
 */
module.exports = ParallelLogin
