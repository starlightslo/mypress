'use strict'

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')


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


	// Set table model
	const UserModel = User.bindKnex(req.app.get('db').normalDB)
	UserModel.query().where('username', username).first()
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
