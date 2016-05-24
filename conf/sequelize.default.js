/*!
 * clout-sequelize
 * Copyright(c) 2015 - 2016 Muhammad Dadu
 * MIT Licensed
 */
module.exports = {
	sequelize: {
		database: '<DATABASE>',
		username: '<USERNAME>',
		password: '<PASSWORD>',
		connection: {
			host : '<HOSTNAME>',
			dialect: 'mysql',
			dialectOptions: {
				multipleStatements: true
			},
			logging: false
		},
		sync: false
	}
};
