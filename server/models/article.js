const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Reference = require('./reference');

const Article = sequelize.define(
    "Article",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 255],
                    msg: "Titlul trebuie sa aiba minim 5 caractere"
                }
            }
        },
        resume: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 255],
                    msg: "Rezumatul trebuie sa aiba minim 10 caractere"
                }
            }
        },
        date: {
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        }
    },
    { tableName: "articles" }
);
Article.hasMany(Reference, {
    foreignKey: "articleId",
});
module.exports = Article;
