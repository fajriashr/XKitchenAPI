const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Product Model
const Product = require('../models/product');
const Category = require('../models/category');
//get all
router.get('/', (req, res, next) => {
    Product.find()
        .populate('category', 'initial')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});
//insert
router.post('/', (req, res, next) => {
    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        code: req.body.code,
        initial:  req.body.initial,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    newProduct.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        })
});

//get by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .populate('category', 'initial name')
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
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;   
    }

    Product.update({ _id : id }, { $set : updateOps })
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
    Product.remove({ _id : id })
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