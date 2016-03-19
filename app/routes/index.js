'use strict'

const config = require('../../config/config')

const fs = require('fs')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')

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
router.get('/', preloadList, controller.index)

module.exports = router