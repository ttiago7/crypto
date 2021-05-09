const server = require('express').Router();
const { response, prependOnceListener, map } = require('../app.js');
const { currency, rate, conn } = require('../db.js');
const { Op, Sequelize, QueryTypes } = require('sequelize');

server.get('/:symbol', async (req, res) => {
	try {
		const { symbol } = req.params;
		var query =
			'SELECT s.id, s.id_currency, s.value, s.createdAt as "created_at", cc.id as "ID", cc.description, cc.symbol FROM ( SELECT q.id_currency, MAX(q.createdAt) AS max_date FROM rates q GROUP BY q.id_currency) r JOIN rates s ON s.id_currency = r.id_currency AND s.createdAt  = r.max_date JOIN crypto.currencies cc ON s.id_currency = cc.id WHERE cc.symbol = ? ORDER BY s.id_currency';

		const results = await conn.query(query, {
			type: QueryTypes.SELECT,
			replacements: [symbol],
		});

		if (results.length > 0) {
			res.status(200).json({
				message: 'Existing rate ' + symbol,
				rate: results[0],
			});
		} else {
			res.status(200).json({
				message: 'Not exist rate',
			});
		}
	} catch (error) {
		res.status(404).json({
			message: 'Error get server: ' + error,
		});
	}
});

server.get('/', async (req, res) => {
	try {
		var query =
			'SELECT s.id, s.id_currency, s.value, s.createdAt as "created_at", cc.id as "ID", cc.description, cc.symbol FROM ( SELECT q.id_currency, MAX(q.createdAt) AS max_date FROM rates q GROUP BY q.id_currency) r JOIN rates s ON s.id_currency = r.id_currency AND s.createdAt  = r.max_date JOIN crypto.currencies cc ON s.id_currency = cc.id ORDER BY s.id_currency';

		const results = await conn.query(query, {
			type: QueryTypes.SELECT,
		});

		if (results.length > 0) {
			res.status(200).json({
				message: 'Existing rates',
				rates: results,
			});
		} else {
			res.status(200).json({
				message: 'Not existing rates',
			});
		}
	} catch (error) {
		res.status(404).json({
			message: 'Error getting rates: ' + error,
		});
	}

	// var response = [];
	// rate.findAll({
	// 	attributes: [
	// 		'id_currency',
	// 		[
	// 			Sequelize.fn('max', Sequelize.col('rate.createdAt')),
	// 			'created_at',
	// 		],
	// 	],
	// 	// order: [['createdAt', 'DESC']],
	// 	// limit: 1,
	// 	group: [['id_currency']],
	// 	include: {
	// 		model: currency,
	// 		required: true,
	// 		attributes: ['id', 'description', 'symbol'],
	// 	},
	// 	// [
	// 	// 	Sequelize.fn('max', Sequelize.col('Rate.createdAt')),
	// 	// 	'created_at',
	// 	// ],
	// 	group: [['id_currency']],
	// })
	// 	.then((rates) => {
	// 		// rates.map((rate) => {
	// 		// 	rate.findOne({
	// 		// 		where: {
	// 		// 			[Op.and]: [
	// 		// 				{ id_currency: rate.id_currency },
	// 		// 				{ createdAt: rate.createdAt },
	// 		// 			],
	// 		// 		},
	// 		// 		include: {
	// 		// 			model: currency,
	// 		// 			required: true,
	// 		// 			attributes: ['id', 'description', 'symbol'],
	// 		// 		},
	// 		// 	}).then((rate) => {
	// 		// 		rates.push(rate);
	// 		// 		//res.send(rate);
	// 		// 		// console.log(rate.id_currency);
	// 		// 		// console.log(rate.createdAt);
	// 		// 	});
	// 		// });
	// 		res.send(rates);
	// 	})
	// 	.catch((error) => {
	// 		res.status(404).json({
	// 			message: 'Error get server: ' + error,
	// 		});
	// 	});
});

server.get('/:idCurrency/:quantity', (req, res) => {
	const { idCurrency, quantity } = req.params;
	rate.findAll({
		attributes: ['value', 'createdAt'],
		where: { id_currency: idCurrency },
		order: [['createdAt', 'DESC']],
		limit: parseInt(quantity, 10),
	})
		.then((rates) => {
			res.status(200).json({
				message: 'Rates found',
				rates: rates.reverse(),
			});
		})
		.catch((error) => {
			res.status(404).json({
				message: 'Error getting rate: ' + error,
			});
		});
});

server.post('/', (req, res) => {
	const { id_currency, value } = req.body;
	currency
		.findOne({ where: { id: id_currency } })
		.then((currency) => {
			if (currency === null) {
				res.status(404).send(
					'The currency with id ' + id_currency + " doesn't exist"
				);
			} else {
				rate.create({
					id_currency: id_currency,
					value: value,
				})
					.then((rate) => {
						currency.addRates(rate);
						res.status(200).json({
							message: 'Rate created',
							rate: rate,
						});
					})
					.catch((error) => {
						res.status(404).json({
							message: 'Error creating rate: ' + error,
						});
					});
			}
		})
		.catch((error) => {
			res.status(404).json({
				message: 'Error post server: ' + error,
			});
		});
});

module.exports = server;
