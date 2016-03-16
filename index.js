'use strict'

const fs = require('fs')
const path = require('path')

const config = require('./config/config')
const server = require('./app/modules/server')
const myServer = new server(config)


const MIDDLEWARE_PATH = './app/middlewares'
const PASSPORT_PATH = './app/passports'
const PUBLIC_DIRECTORY_PATH = 'public'


// Loading the routes
require('./config/routes')(myServer.app)

// Auto include the third-party middlewares
fs.readdirSync(MIDDLEWARE_PATH).forEach(file => {
	if (file.endsWith('.js')) {
		myServer.setMiddleware(require(MIDDLEWARE_PATH + '/' + file))
	}
})

// Auto include the strategies
fs.readdirSync(PASSPORT_PATH).forEach(file => {
	if (file.endsWith('.js')) {
		myServer.setPassport(require(PASSPORT_PATH + '/' + file))
	}
})

// Set the public directory
myServer.setPublicDirectory(path.join(config.root, PUBLIC_DIRECTORY_PATH))

// Get the port number from arguments
const port = process.argv[2] || config.port

// Start to listen on port
myServer.listen(port)
