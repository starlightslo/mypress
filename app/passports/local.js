'use strict'

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const UserTable = 'users'

const Log = require('../models/log')

const LOGIN = 'Login'
const SUCCESS = 'Success'
const FAILED = 'Failed'

const AUTH_FAILED = 'Auth failed'
const NOT_FOUND_USER = 'Not found user'
/**
 * Exports
 */
module.exports = new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
},
function (req, username, password, done) {
	/*
	 * Here should check the user data is correct
	 */


	 // Log data
	 let logData = {
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
		user_agent: req.headers['User-Agent'] || req.get('User-Agent') || '',
		method: req.method,
		endpoint: req.originalUrl,
		user: username,
		body: '',
		type: LOGIN,
		action: SUCCESS,
		detail: ''
	}

	// Define
	const db = req.app.get('db').normalDB
	db(UserTable).where('username', username).first()
	.then(user => {
		if (user) {
			// verify the password
			if (bcrypt.compareSync(password, user.password)) {
				done(null, user)
				Log.add(logData).then(() => {})
			} else {
				logData['action'] = FAILED
				logData['detail'] = AUTH_FAILED
				Log.add(logData).then(() => {})
				return done(null, false, AUTH_FAILED)
			}
		} else {
			logData['action'] = FAILED
			logData['detail'] = NOT_FOUND_USER
			Log.add(logData).then(() => {})
			return done(null, false, NOT_FOUND_USER)
		}
	})
	.catch(err => {
		done(err)
	})
})
