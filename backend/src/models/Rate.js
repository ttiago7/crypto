const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('rate', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		value: {
			type: DataTypes.DECIMAL(12, 6),
			allowNull: false,
		},
	});
};
