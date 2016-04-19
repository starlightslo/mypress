'use strict'

const Language = require('../modules/language')

const UserTable = 'users'
const UserProfileTable = 'user_profiles'
const MenuTable = 'menu'
const ExperienceTable = 'experiences'
const PortfolioTable = 'portfolios'
const SkillTable = 'skills'

exports.index = function (req, res, next) {
	const settings = req.app.get('settings')
	const language = req.app.get('language')
	const template = settings.template
	const templateFile = template + '/index'

	// Get template language data
	const T = Language.getTemplateLanguage(template, language)

	// Define
	const db = req.app.get('db').normalDB
	let userList = []
	let menuList = []
	let portfolioList = []
	let skillList = []
	let experienceMap = new Map()

	// Getting menu data
	db(MenuTable).where('language', language).orderBy('order')
	.then(menus => {
		menus.forEach(menu => {
			menuList.push({
				name: menu.name,
				link: menu.link,
				target: menu.target,
			})
		})
		return db(UserTable).innerJoin(UserProfileTable, 'user_profiles.user_id', 'users.id').where('user_profiles.language', language).orderBy('first_name').orderBy('last_name')
	})
	// Getting user data
	.then(users => {
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
		return db(PortfolioTable).where('language', language).orderBy('name')
	})
	// Getting portfolio data
	.then(portfolios => {
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
		return db(SkillTable).where('language', language).orderBy('order')
	})
	.then(skills => {
		skills.forEach(skill => {
			skillList.push({
				name: skill.name,
				percent: skill.percent,
				color: skill.color,
				animateTime: skill.animate_time
			})
		})
		return db(ExperienceTable).where('language', language).orderBy('start_working_date', 'desc').orderBy('end_working_date', 'desc')
	})
	.then(experiences => {
		experiences.forEach(experience => {
			// Getting the year of experience
			let year = (new Date()).getFullYear()
			if (!experience.still_here) {
				year = experience.end_working_date.getFullYear()
			}
			
			// Getting experiences from the list
			let experienceList = []
			if (experienceMap.has(year)) {
				experienceList = experienceMap.get(year)
			}

			// Adding a new experience
			experienceList.push({
				companyName: experience.company_name,
				companyLogo: experience.company_logo,
				role: experience.role,
				description: experience.description,
				startWorkingDate: experience.start_working_date,
				endWorkingDate: experience.end_working_date,
				stillHere: experience.still_here
			})

			// Writing to the experience map
			experienceMap.set(year, experienceList)
		})
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		// Transfer map to the object, because swig dese not support map
		let experiences = {}
		experienceMap.forEach((value, key) => {
			experiences[key] = value
		})

		const resp = {
			T: T,
			language: language,
			settings: settings,
			menuList: menuList,
			userList: userList,
			portfolioList: portfolioList,
			skillList: skillList,
			experiences: experiences
		}
		res.render(templateFile, resp)
	})
}
