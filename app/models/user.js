'use strict'

const Model = require('objection').Model

class User extends Model {
	static get tableName() {
		return 'users'
	}

	static get relationMappings() {
		return {
			profile: {
				relation: Model.OneToManyRelation,
				modelClass: __dirname + '/user_profile',
				join: {
					from: 'users.id',
					to: 'user_profile.user_id'
				}
			}
		}
	}
}

module.exports = User