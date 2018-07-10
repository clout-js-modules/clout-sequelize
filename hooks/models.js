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

			this.Sequelize = Sequelize;

			if (conf.database === '<DATABASE>') {
				logger.warn('Configuration for clout-sequelize missing');
				return next();
			}

			this.sequelize = new Sequelize(conf.database, conf.username, conf.password, conf.connection);
			logger.info('sequelize initialized');

			next();
		}
	},
	sequelizeAssosiate: {
		event: 'start',
		priority: 18, // MODEL + 3
		fn: function (next) {
			const models = this.models;
			const logger = this.logger;

			let modelsAssosiated = [];
			
			Object.keys(models).forEach((modelName) => {
				const model = models[modelName];

				if (model.associate) {
					logger.debug(`attaching associations for model ${modelName}`);
					model.associate(models);
					modelsAssosiated.push(modelName);
				}
			});

			logger.info(`models associated for ${modelsAssosiated.join(', ')}`);

			next();
		}
	},
	sequelizeSync: {
		event: 'start',
		priority: 19, // MODEL + 4
		fn: function (next) {
			const logger = this.logger;
			const conf = this.config.sequelize;
			const syncOpts = conf.sync
				? Object.assign({}, conf.sync)
				: false;

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

					next('Sequalize failed to sync');
				});
		}
	}
};
