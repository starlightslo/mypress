'use strict'

const config = require('../../config/config')
const Language = require('../modules/language')
const passport = require('passport')
const jwt = require('jsonwebtoken')


exports.login = function (req, res, next) {
	const websiteName = req.app.get('websiteName')
	const logoString = req.app.get('logoString')
	const logoImage = req.app.get('logoImage')
	const logoLink = req.app.get('logoLink')
	const webTitle = req.app.get('webTitle')
	const webSubtitle = req.app.get('webSubtitle')
	const mainButtonString = req.app.get('mainButtonString')
	const mainButtonLink = req.app.get('mainButtonLink')
	const mainButtonTarget = req.app.get('mainButtonTarget')
	const language = req.app.get('language')
	const template = req.app.get('template')
	const templateFile = template + '/login'

	// Get template language data
	const T = Language.getTemplateLanguage(template, language)

	const resp = {
		T: T,
		language: language,
		websiteName: websiteName,
		logoString: logoString,
		logoImage: logoImage,
		logoLink: logoLink,
		webTitle: webTitle,
		webSubtitle: webSubtitle,
		mainButtonString: mainButtonString,
		mainButtonLink: mainButtonLink,
		mainButtonTarget: mainButtonTarget,
		template: template
	}
	res.render(templateFile, resp)
}

exports.loginSuccess = function(req, res, next) {
	const language = req.app.get('language')
	const user = req.user
	const remoteIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	console.log(user)
	console.log(remoteIP)

	// Create user data
	const userData = {
		ip: remoteIP,
		userId: user.id
	}

	// Create user token
	const token = jwt.sign(userData, config.secret, {
		expiresIn: config.tokenExpiryTime
	})
	req.session.token = token

	res.redirect('/' + language + '/admin')
}

exports.localAuthenticate = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.redirect('login')
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err)
			}
			return next()
		})
	})(req, res, next)
}

exports.checkAuth = function(req, res, next) {
	const remoteIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	const token = req.session.token
	if (!token) {
		res.redirect('/')
		return
	}

	// Decode the token
	jwt.verify(token, config.secret, (err, userData) => {
		if (err) {
			res.redirect('/')
			return
		}

		// Checking user data
		if (userData.ip !== remoteIP) {
			res.redirect('/')
			return
		}
		next()
	})
}
