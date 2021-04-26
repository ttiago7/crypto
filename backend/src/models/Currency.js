const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	var currenciesSchema = sequelize.define('Currency', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		symbol: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	currenciesSchema.beforeCreate(function (model) {
		model.symbol = model.symbol.toUpperCase();
	});
};

// var Project = sequelize.define('project', {}, {
//     hooks: {
//         beforeCreate: function () {
//             // Do other stuff
//         }
//     }
// });
