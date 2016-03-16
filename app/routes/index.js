'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')

/**
 * Routers
 */
router.get('/', controller.index)

module.exports = router