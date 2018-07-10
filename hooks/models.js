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
			const conf = this.config.sequelize;
			const logger = this.logger;
			let syncOpts = conf.sync
				? Object.assign({}, conf.sync)
				: false;

			this.Sequelize = Sequelize;

			if (conf.database === '<DATABASE>') {
				logger.warn('Configuration for clout-sequelize missing');
				return next();
			}

			this.sequelize = new Sequelize(conf.database, conf.username, conf.password, conf.connection);
			logger.info('sequelize initialized');

			if (!syncOpts) {
				return next();
			}

			this.sequelize.sync(syncOpts)
				.then(() => {
					logger.info('Sequalize has synced');
					next();
				})
				.catch((error) => {
					logger.error('Sequalize failed to sync');
					logger.error(error);
					next();
				});
		}
	}
};
