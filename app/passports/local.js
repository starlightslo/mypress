'use strict'

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const UserTable = 'users'


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


	// Define
	const db = req.app.get('db').normalDB
	db(UserTable).where('username', username).first()
	.then(user => {
		if (user) {
			// verify the password
			if (bcrypt.compareSync(password, user.password)) {
				done(null, user)
			} else {
				return done(null, false, 'Auth failed')
			}
		} else {
			return done(null, false, 'Not found user')
		}
	})
	.catch(err => {
		done(err)
	})
})
