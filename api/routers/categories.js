const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Category Model
const Category = require('../models/category');
//get all
router.get('/', (req, res, next) => {
    Category.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//insert
router.post('/', (req, res, next) => {
    const newCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        code: req.body.code,
        initial: req.body.initial,
        name: req.body.name
    });

    newCategory.save()
        .then(doc => {
            console.log(doc);
            res.status(201).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        })
});

//get  by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Category.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

//update
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;

    Category.update({ _id : id }, { $set : req.body })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
        })
});

//delete
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Category.remove({ _id : id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
        })
});

module.exports = router;