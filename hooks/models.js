/*!
 * clout-sequelize
 * Copyright(c) 2015 - 2016 Muhammad Dadu
 * MIT Licensed
 */
const
	debug = require('debug')('clout:hook/middleware'),
	sequelize = require('sequelize');

module.exports = {
	sequelize: {
		event: 'start',
		priority: 'MODEL',
		fn: function (next) {
			var conf = this.config.sequelize;
			this.Sequelize = Sequelize;
			if (conf.database === '<DATABASE>') {
				debug('Configuration for clout-sequelize missing')
				this.logger.warn('Configuration for clout-sequelize missing');
				return next();
			}
			this.sequelize = sequelize = new Sequelize(conf.database, conf.username, conf.password, conf.connection);
			debug('sequelize initialized');
			next();
		}
	},
	syncModels: {
		event: 'start',
		priority: 20,
		fn: function (next) {
			var conf = this.config.sequelize,
				sequelize = this.sequelize;
			if (!conf.sync || !sequelize) {
				debug('skipping model syncronize');
				return next();
			}
			// syncronize sequelize
			debug('syncronizing sequelize');
			sequelize.sync(conf.sync)
				.then(function () {
					debug('models synced');
					next();
				}, function (err) {
					debug('sync error:', err);
					next(err);
				});
		}
	}
};
