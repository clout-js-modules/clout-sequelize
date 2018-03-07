/*!
 * clout-sequelize
 * Copyright(c) 2015 - 2016 Muhammad Dadu
 * MIT Licensed
 */
const debug = require('debug')('clout:hook/middleware');
const Sequelize = require('sequelize');

module.exports = {
	sequelize: {
		event: 'start',
		priority: 'MODEL',
		fn: function (next) {
			let conf = this.config.sequelize;
			this.Sequelize = Sequelize;

			if (conf.database === '<DATABASE>') {
				this.logger.warn('Configuration for clout-sequelize missing');
				return next();
			}

			this.sequelize = new Sequelize(conf.database, conf.username, conf.password, conf.connection);
			this.logger.info('sequelize initialized');
			next();
		}
	},
	syncModels: {
		event: 'start',
		priority: 20,
		fn: function (next) {
			let conf = this.config.sequelize;
			let sequelize = this.sequelize;

			if (!conf.sync || !sequelize) {
				this.logger.info('skipping model syncronize');
				return next();
			}

			// syncronize sequelize
			this.logger.info('syncronizing sequelize');
			sequelize.sync(conf.sync)
				.then(() => {
					this.logger.info('models synced');
					next();
				}, (err) => {
					this.logger.error('sync error:', err);
					next(err);
				});
		}
	}
};
