'use strict'

const Model = require('objection').Model

class UserProfile extends Model {
	static get tableName() {
		return 'user_profile'
	}

	static get relationMappings() {
		return {
			owner: {
				relation: Model.OneToOneRelation,
				modelClass: __dirname + '/User',
				join: {
					from: 'user_profile.user_id',
					to: 'users.id'
				}
			}
		}
	}
}

module.exports = UserProfile