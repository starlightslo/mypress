'use strict'

const path = require('path')
const extend = require('util')._extend

const development = require('./env/development')
const test = require('./env/test')
const production = require('./env/production')

 
/**
 * Default config
 */
const defaults = {
	appName: 'MyPress',
	language: 'en',
	saltLength: 10,
	tokenExpiryTime: 10*60,
	delayResponse: 3000,
	root: path.join(__dirname, '..'),
	env: process.env.NODE_ENV || 'development'
}

/**
 * Expose
 */
module.exports = {
	development: extend(development, defaults),
	test: extend(test, defaults),
	production: extend(production, defaults)
}[process.env.NODE_ENV || 'development']
