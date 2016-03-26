'use strict'

const config = require('../../config/config')

const fs = require('fs')
const express = require('express')
const router = express.Router({mergeParams: true})
const controller = require('../controllers/admin')
const authController = require('../controllers/auth')

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
router.get('/', authController.checkAuth, preloadList, controller.index)
router.get('/user', authController.checkAuth, preloadList, controller.user)
router.get('/user/add', authController.checkAuth, preloadList, controller.add)
router.get('/user/view/:username', authController.checkAuth, preloadList, controller.view)
router.get('/user/:page', authController.checkAuth, preloadList, controller.user)

router.post('/user/add', authController.checkAuth, preloadList, controller.addUser)
router.post('/user/edit/:username', authController.checkAuth, preloadList, controller.editUser)

router.delete('/user/:username', authController.checkAuth, preloadList, controller.deleteUser)


module.exports = router