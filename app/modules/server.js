'use strict'


const express = require('express')
const session = require('express-session')
const compression = require('compression')
const RedisStore = require('connect-redis')(session)
const errorhandler = require('errorhandler')
const app = express()

const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('connect-flash')
const swig = require('swig')

const DEFAULT_PUBLIC_DIRECTORY = 'public'

class Server {
	constructor(config) {
		this.config = config
		this.app = app

		// Enable the proxy
		app.set('trust proxy', 'loopback')

		// compress responses
		app.use(compression())

		// Set variables into app
		app.set('secret', this.config.secret)

		// Set default public directory
		app.use(express.static(DEFAULT_PUBLIC_DIRECTORY, {
			maxAge: this.config.cache.maxage
		}))

		// Set views and engine
		app.engine('html', swig.renderFile)
		app.set('views', config.root + '/app/views')
		app.set('view engine', 'html')

		this.initMiddleware()
		this.initPassport()
	}

	// Set the middleware
	setMiddleware(middleware) {
		app.use(middleware)
	}

	// Set the passport
	setPassport(pt) {
		passport.use(pt)
	}

	// Set the public directory
	setPublicDirectory(path) {
		app.use(express.static(path, {
			maxAge: this.config.cache.maxage
		}))
	}

	initMiddleware() {
		// If the environment is development, open the error handler for debug
		if (this.config.env === 'development') {
			app.use(errorhandler())
		}

		// Setting the client error handler
		if (this.config.env === 'development') {
			app.use(function(err, req, res, next) {
				res.status(err.code || 500)
				.json({
					message: err
				})
			})
		} else {
			app.use(function(err, req, res, next) {
				res.status(err.status || 500)
				.json({
					message: err.message
				})
			})
		}

		// Sessions
		if (this.config.redis) {
			app.use(session({
				store: new RedisStore(this.config.redis),
				secret: app.get('secret'),
				resave: false,
				saveUninitialized: true
			}))
		} else {
			app.use(session({secret: app.get('secret')}))
		}

		// bodyParser
		app.use(bodyParser.urlencoded({ extended: false }))
		app.use(bodyParser.json())

		// Passport
		app.use(passport.initialize());
		app.use(passport.session());

		// connect flash for flash messages - should be declared after sessions
		app.use(flash())
	}

	initPassport() {
		// serialize sessions
		passport.serializeUser((user, done) => {
			done(null, user)
		})
		passport.deserializeUser((user, done) => {
			done(null, user)
		})
	}

	listen(port) {
		app.set('port', port)
		app.listen(app.get('port'), () => {
			console.log('MyPress is running on port: ' + app.get('port'))
		})
		.on('error', err => {
			console.log(err)
		})
	}
}


/**
 * Exports
 */
module.exports = Server

