'use strict'

class Verify {
	constructor(rules) {

	}

	isEmpty(data) {
		if (data === null || data === undefined) {
			return true
		}
		if (data.length === 0) {
			return true
		}
		return false
	}

	isNumber(data) {
		if (data === null || data === undefined || typeof data === 'object') {
			return false
		}
		if (typeof data === 'string' && data.trim().length == 0) {
			return false
		}
		return !isNaN(Number(data))
	}

	inNumber(data, min, max) {
		if (!this.isNumber(data)) {
			return false
		}
		if (Number(data) >= min && Number(data) <= max) {
			return true
		}
		return false
	}

	isBoolean(data) {
		if (data === null || data === undefined || typeof data === 'object') {
			return false
		}
		return (typeof data === 'boolean')
	}

	isDate(data, format) {
		if (data === null || data === undefined || typeof data === 'object') {
			return false
		}
		const moment = require('moment')
		return moment(data, format).isValid()
	}

	checkLength(data, min, max) {
		if (data === null || data === undefined || typeof data === 'object') {
			return false
		}
		if (data.length >= min && data.length <= max) {
			return true
		}
		return false
	}

	username(data, min, max) {
		// Checking empty
		if (this.isEmpty(data)) {
			return false
		}

		// Checking length
		if (!this.checkLength(data, min, max)) {
			return false
		}

		// Checking special characters
		return /^[0-9a-zA-Z_\-\+]*$/.test(data)
	}

	password(data, min, max) {
		// Checking empty
		if (this.isEmpty(data)) {
			return false
		}

		// Checking length
		if (!this.checkLength(data, min, max)) {
			return false
		}

		// Checking special characters
		return /^[0-9a-zA-Z_\-\+~!@#$%\^&*=?,.]*$/.test(data)
	}
}


/**
 * Exports
 */
module.exports = Verify
