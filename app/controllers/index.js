'use strict'

const Menu = require('../models/menu')

exports.index = function (req, res, next) {
	const websiteName = req.app.get('websiteName')
	const logoString = req.app.get('logoString')
	const logoImage = req.app.get('logoImage')
	const logoLink = req.app.get('logoLink')
	const webTitle = req.app.get('webTitle')
	const webSubtitle = req.app.get('webSubtitle')
	const mainButtonString = req.app.get('mainButtonString')
	const mainButtonLink = req.app.get('mainButtonLink')
	const mainButtonTarget = req.app.get('mainButtonTarget')
	const template = req.app.get('template')
	const templateFile = template + '/index'

	// Define
	let menuList = []

	// Getting menu data
	const MenuModel = Menu.bindKnex(req.app.get('db').normalDB)
	MenuModel.query()
	.orderBy('order')
	.then(menus => {
		console.log('in menu')
		menus.forEach(menu => {
			menuList.push({
				name: menu.name,
				link: menu.link,
				target: menu.target,
			})
		})
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		console.log('in finally')
		const resp = {
			websiteName: websiteName,
			logoString: logoString,
			logoImage: logoImage,
			logoLink: logoLink,
			webTitle: webTitle,
			webSubtitle: webSubtitle,
			mainButtonString: mainButtonString,
			mainButtonLink: mainButtonLink,
			mainButtonTarget: mainButtonTarget,
			template: template,
			menuList: menuList
		}
		res.render(templateFile, resp)
	})
}
