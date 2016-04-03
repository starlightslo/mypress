'use strict'

const config = require('../../config/config')

const fs = require('fs')
const express = require('express')
const router = express.Router({mergeParams: true})
const controller = require('../controllers/admin')
const authController = require('../controllers/auth')

const multipart = require('connect-multiparty')

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
router.get('/user/add', authController.checkAuth, preloadList, controller.addUser)
router.get('/user/view/:username', authController.checkAuth, preloadList, controller.viewUser)
router.post('/user/add', authController.checkAuth, preloadList, controller.insertUser)
router.post('/user/edit/:username', authController.checkAuth, preloadList, controller.editUser)
router.post('/user/upload/:username', authController.checkAuth, preloadList, multipart(), controller.uploadPicture)
router.delete('/user/:username', authController.checkAuth, preloadList, controller.deleteUser)

router.get('/menu', authController.checkAuth, preloadList, controller.menu)
router.get('/menu/add', authController.checkAuth, preloadList, controller.addMenu)
router.get('/menu/view/:key', authController.checkAuth, preloadList, controller.viewMenu)
router.post('/menu/add', authController.checkAuth, preloadList, controller.insertMenu)
router.post('/menu/edit/:key', authController.checkAuth, preloadList, controller.editMenu)
router.delete('/menu/:key', authController.checkAuth, preloadList, controller.deleteMenu)

module.exports = router