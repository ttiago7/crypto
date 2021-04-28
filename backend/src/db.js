require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

//const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const DB_USER = 'root';
const DB_PASSWORD = '042577';
const DB_HOST = 'mysql'; //docker
//const DB_HOST = 'localhost'; //localhost
const MYSQL_PORT = 3306;
const DB_NAME = 'crypto';

const sequelize = new Sequelize(
	`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${MYSQL_PORT}/${DB_NAME}`,
	{
		logging: true, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
	}
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
	.filter(
		(file) =>
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js'
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toLowerCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { currency, rate } = sequelize.models;

// 1:M
currency.hasMany(rate, { foreignKey: 'id_currency' }); //tiene muchas
rate.belongsTo(currency, { foreignKey: 'id_currency' }); // pertenece a

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
