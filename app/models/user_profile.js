'use strict'

const Model = require('objection').Model

class UserProfile extends Model {
	static get tableName() {
		return 'user_profiles'
	}

	static get relationMappings() {
		return {
			owner: {
				relation: Model.OneToOneRelation,
				modelClass: __dirname + '/User',
				join: {
					from: 'user_profiles.user_id',
					to: 'users.id'
				}
			}
		}
	}
}

module.exports = UserProfile