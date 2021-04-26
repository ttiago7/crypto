const server = require('express').Router();
const { response, prependOnceListener } = require('../app.js');
const { Currency, Rate } = require('../db.js');
const { Op, Sequelize } = require('sequelize');

// server.get('/', (req, res) => {
// 	Currency.findAll({
// 		include: [
// 			{
// 				model: Rate,
// 			},
// 		],
// 	})
// 		.then((currencies) => {
// 			res.send(currencies);
// 		})
// 		.catch((error) => {
// 			res.status(404).json({
// 				message: 'Error get server: ' + error,
// 			});
// 		});
// });
server.get('/', (req, res) => {
	Currency.findAll({
		attributes: { exclude: ['createdAt', 'updatedAt'] },
		order: [['id', 'ASC']],
	})
		.then((currencies) => {
			res.send(currencies);
		})
		.catch((error) => {
			res.status(404).json({
				message: 'Error get server: ' + error,
			});
		});
});

server.post('/', (req, res) => {
	const { description, symbol } = req.body;
	Currency.findOrCreate({
		where: {
			description: description,
			symbol: symbol,
		},
	})
		.then((currency) => {
			res.status(200).json({
				message: 'Currency created',
				currency: currency[0],
			});
		})
		.catch((error) => {
			res.status(404).json({
				message: 'Error post server: ' + error,
			});
		});
});

module.exports = server;
