'use strict'

exports.index = function (req, res, next) {
	const websiteName = req.app.get('websiteName')
	const template = req.app.get('template') + '/index'

	// TODO

	const resp = {
		title: websiteName
	}
	res.render(template, resp)
}
