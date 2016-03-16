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
