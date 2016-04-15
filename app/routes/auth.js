'use strict'

const config = require('../../config/config')

const fs = require('fs')
const express = require('express')
const router = express.Router({mergeParams: true})
const controller = require('../controllers/auth')

const PRELOAD_PATH = './app/routes/preloads'

/**
 * Preload 
 */
 let preloadList = []
fs.readdirSync(PRELOAD_PATH).forEach(file => {
	if (file.endsWith('.js')) {
		preloadList.push(require(config.root + '/' + PRELOAD_PATH + '/' + file))
	}
})

/**
 * Routers
 */
router.get('/login', preloadList, controller.login)
router.get('/logout', preloadList, controller.logout)
router.post('/login', preloadList, controller.localAuthenticate, controller.loginSuccess)

module.exports = router