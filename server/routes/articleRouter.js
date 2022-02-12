const Article = require('../models/article');
const { Op } = require('sequelize');
const express = require('express');
const app = express.Router();
const _ = require("lodash");

app.route('/article')
    .get(async (req, res) => {
        try {
            let articles;
            if(_.isEmpty(req.query)) {
                articles = await Article.findAll();
            } else {
                const page = req.query.page ? req.query.page : 1;
                const perPage = req.query.perPage ? req.query.perPage : 100;
                const date = req.query.date ? req.query.date : Date.now();
                const title = req.query.title ? req.query.title : "";
                const sort = req.query.sort;
                articles = await Article.findAll({
                    where: {
                        title: {
                            [Op.like]: `%${title}%`,
                        },
                        date: {
                            [Op.gt]: `${date}`
                        }
                    },
                    order: [
                        ['title', sort],
                    ],
                    offset: (page - 1)*perPage,
                    limit: perPage,
                })
            }
             
            res.status(200).json({
                success: true,
                articles: articles
            });
        } catch(err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    });

app.route('/article/:id')
    .get(async (req, res) => {
        try {
            const article = await Article.findByPk(req.params.id);
            if(!article) {
                res.status(500).json({
                    success: false,
                    error: `Articolul cu id-ul ${req.params.id} nu a fost gasit`,
                });
            }
            
            res.status(200).json({
                success: true,
                article: article
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    });

app.route('/article')
    .post(async (req, res) => {
        try {
            const article = await Article.create(req.body);
            res.status(200).json({
                success: true,
                article: article
            })
        } catch(err) {
            res.json({
                success: false,
                error: err.message,
            });
        }
    });

app.route('/article/:id')
    .put(async (req, res) => {
        try {
            const article = await Article.findByPk(req.params.id);
            if(!article) {
                res.status(500).json({
                    success: false,
                    error: `Articolul cu id-ul ${req.params.id} nu a fost gasit`,
                });
            }
            
            await article.update(req.body);
            res.status(200).json({
                success: true
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    });

app.route('/article/:id')
    .delete(async (req, res) => {
        try {
            const article = await Article.findByPk(req.params.id);
            if(!article) {
                return res.status(500).json({
                    success: false,
                    error: `Articolul cu id-ul ${req.params.id} nu a fost gasit`,
                });
            }

            await article.destroy();
            res.status(200).json({
                success: true
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    })

module.exports = app;