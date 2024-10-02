const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = User;
