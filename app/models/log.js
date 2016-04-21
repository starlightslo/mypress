'use strict'

const Log = require('mongoose').model('Log')

exports.add = (data) => {
	const log = new Log(data)
	return new Promise((resolve, reject) => {
		log.save((err) => {
			if (err) reject(err)
			else resolve()
		})
	})
}