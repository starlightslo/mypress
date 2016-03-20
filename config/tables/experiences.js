'use strict'

const config = require('../config')

module.exports = {
	name: 'experiences',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'language',
		type: 'string',
		length: 16
	},{
		name: 'company_name',
		type: 'string',
		length: 128
	},{
		name: 'company_logo',
		type: 'string',
		length: 256
	},{
		name: 'role',
		type: 'string',
		length: 128
	},{
		name: 'description',
		type: 'text',
		textType: 'longtext'
	},{
		name: 'start_working_date',
		type: 'date'
	},{
		name: 'end_working_date',
		type: 'date'
	},{
		name: 'still_here',
		type: 'boolean'
	}],
	defaultDataList: [{
		language: 'en',
		company_name: 'Facebook',
		company_logo: 'images/asset01.jpg',
		role: 'UI/UX Designer',
		description: 'October 2015 – Present (2 months)Menlo Park, CA, United States of America',
		start_working_date: '2015/10/01',
		end_working_date: new Date(),
		still_here: true
	},{
		language: 'en',
		company_name: 'Amazon',
		company_logo: 'images/asset02.jpg',
		role: 'UI/UX Designer',
		description: 'October 2014 – September 2015 (2 months)Menlo Park, CA, United States of America',
		start_working_date: '2014/10/01',
		end_working_date: '2015/09/30',
		still_here: false
	},{
		language: 'en',
		company_name: 'Apple',
		company_logo: 'images/asset03.jpg',
		role: 'UI/UX Designer',
		description: 'October 2010 – September 2014 (2 months)Menlo Park, CA, United States of America',
		start_working_date: '2010/10/01',
		end_working_date: '2014/09/30',
		still_here: false
	},{
		language: 'en',
		company_name: 'IBM',
		company_logo: 'images/asset04.jpg',
		role: 'UI/UX Designer',
		description: 'October 2008 – September 2010 (2 months)Menlo Park, CA, United States of America',
		start_working_date: '2008/10/01',
		end_working_date: '2010/09/30',
		still_here: false
	},{
		language: 'tw',
		company_name: 'Facebook',
		company_logo: 'images/asset01.jpg',
		role: 'UI/UX 設計師',
		description: 'October 2015 – Present (2 months)Menlo Park, CA, 美國',
		start_working_date: '2015/10/01',
		end_working_date: new Date(),
		still_here: true
	},{
		language: 'tw',
		company_name: 'Amazon',
		company_logo: 'images/asset02.jpg',
		role: 'UI/UX 設計師',
		description: 'October 2014 – September 2015 (2 months)Menlo Park, CA, 美國',
		start_working_date: '2014/10/01',
		end_working_date: '2015/09/30',
		still_here: false
	},{
		language: 'tw',
		company_name: 'Apple',
		company_logo: 'images/asset03.jpg',
		role: 'UI/UX 設計師',
		description: 'October 2010 – September 2014 (2 months)Menlo Park, CA, 美國',
		start_working_date: '2010/10/01',
		end_working_date: '2014/09/30',
		still_here: false
	},{
		language: 'tw',
		company_name: 'IBM',
		company_logo: 'images/asset04.jpg',
		role: 'UI/UX 設計師',
		description: 'October 2008 – September 2010 (2 months)Menlo Park, CA, 美國',
		start_working_date: '2008/10/01',
		end_working_date: '2010/09/30',
		still_here: false
	}]
}
