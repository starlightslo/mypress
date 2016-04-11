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
router.get('/user/validate/:username', authController.checkAuth, preloadList, controller.validateUser)
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

router.get('/portfolio', authController.checkAuth, preloadList, controller.portfolio)
router.get('/portfolio/add', authController.checkAuth, preloadList, controller.addPortfolio)
router.get('/portfolio/view/:key', authController.checkAuth, preloadList, controller.viewPortfolio)
//router.post('/portfolio/add', authController.checkAuth, preloadList, controller.insertPortfolio)
//router.post('/portfolio/edit/:key', authController.checkAuth, preloadList, controller.editPortfolio)
router.post('/portfolio/upload/:key', authController.checkAuth, preloadList, multipart(), controller.uploadPortfolioPicture)
//router.delete('/portfolio/:key', authController.checkAuth, preloadList, controller.deletePortfolio)

module.exports = router