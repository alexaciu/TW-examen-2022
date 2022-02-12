const { DataTypes } = require('sequelize');
const Article = require('./article');
const sequelize = require('../sequelize');

const Reference = sequelize.define(
    "Reference",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        title: {
            type: DataTypes.STRING,
            //minlength
        },
        date: {
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        },
        authors: {
            type: DataTypes.STRING,
        }
    },
    { tableName: "reference" }
);
module.exports = Reference;