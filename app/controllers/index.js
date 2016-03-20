'use strict'

const Menu = require('../models/menu')
const User = require('../models/user')
const Portfolio = require('../models/portfolio')
const Skill = require('../models/skill')

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
	const MenuModel = Menu.bindKnex(req.app.get('db').normalDB)
	const UserModel = User.bindKnex(req.app.get('db').normalDB)
	const PortfolioModel = Portfolio.bindKnex(req.app.get('db').normalDB)
	const SkillModel = Skill.bindKnex(req.app.get('db').normalDB)
	let userList = []
	let menuList = []
	let portfolioList = []
	let skillList = []

	// Getting menu data
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
		return UserModel.query().orderBy('first_name').orderBy('last_name')
	})
	// Getting user data
	.then(users => {
		console.log('in user')
		users.forEach(user => {
			userList.push({
				username: user.username,
				privilege: user.privilege,
				firstName: user.first_name,
				lastName: user.last_name,
				picture: user.picture,
				email: user.email,
				introduction: user.introduction,
				facebook: user.facebook,
				linkedin: user.linkedin,
				twitter: user.twitter,
				google: user.google,
				flickr: user.flickr
			})
		})
		return PortfolioModel.query().orderBy('name')
	})
	// Getting portfolio data
	.then(portfolios => {
		console.log('in portfolio')
		portfolios.forEach(portfolio => {
			portfolioList.push({
				name: portfolio.name,
				client: portfolio.client,
				role: portfolio.role,
				description: portfolio.description,
				link: portfolio.link,
				target: portfolio.target,
				picture: portfolio.picture,
				pictureAlt: portfolio.picture_alt
			})
		})
		return SkillModel.query().orderBy('order')
	})
	.then(skills => {
		console.log('in skill')
		skills.forEach(skill => {
			skillList.push({
				name: skill.name,
				percent: skill.percent,
				color: skill.color,
				animateTime: skill.animate_time
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
			menuList: menuList,
			userList: userList,
			portfolioList: portfolioList,
			skillList: skillList
		}
		res.render(templateFile, resp)
	})
}
