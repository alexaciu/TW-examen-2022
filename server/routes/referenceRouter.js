const Reference = require('../models/reference');
const express = require('express');
const app = express.Router({mergeParams: true});

app.route('/')
    .get( async (req, res) => {
        try {
            const { articleId } = req.params;
            const references = await Reference.findAll({
                where: {
                    articleId: articleId,
                }
            });

            res.status(200).json({
                success: true,
                references: references,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    });

app.route('/:id')
    .get( async (req, res) => {
        try {  
            const { articleId } = req.params;
            const reference = await Reference.findOne({
                where: {
                    id: req.params.id,
                    articleId: articleId,
                }
            });

            if(!reference) {
                return res.status(500).json({
                    success: false,
                    message: `Referinta cu id-ul ${req.params.id} nu exista`,
                });
            };

            return res.status(200).json({
                success: true,
                reference: reference
            })

        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    });

app.route('/')
    .post( async (req, res) => {
        try {
            const reference = await Reference.create(req.body);

            res.status(200).json({
                success: true,
                reference: reference,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        } 
    });

app.route('/:id')
    .put( async (req, res) => {
        try {  
            const { articleId } = req.params;
            const reference = await Reference.findOne({
                where: {
                    id: req.params.id,
                    articleId: articleId,
                }
            });

            if(!reference) {
                return res.status(500).json({
                    success: false,
                    message: `Referinta cu id-ul ${req.params.id} nu exista`,
                });
            }
            
            await reference.update(req.body);

            return res.status(200).json({
                success: true,
                reference: reference
            })

        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    });

app.route('/:id')
    .delete( async (req, res) => {
        try {  
            const { articleId } = req.params;
            const reference = await Reference.findOne({
                where: {
                    id: req.params.id,
                    articleId: articleId,
                }
            });

            if(!reference) {
                res.status(500).json({
                    success: false,
                    message: `Referinta cu id-ul ${req.params.id} nu exista`,
                });
            }
            
            await reference.destroy();

            res.status(200).json({
                success: true,
                reference: reference
            })

        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    });

module.exports = app;