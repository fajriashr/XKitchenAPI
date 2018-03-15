const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Category model
const Category = require('../models/category');

//get all
router.get('/', (req, res, next) => {
    // '/' parameter url bebas diisi
    Category.find()//mencari dulu
         .exec()//lalu di execute
         .then(result => {//jika ada
            res.status(200).json(result); //kirim respon ke server
        })
        .catch(err => {//jika menangkap error
            console.log(err);
            res.status(500).json({//tampilkan status pada browser
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    //membuat schema post
    //req.body pengambilan data dari model
    const newCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        code: req.body.code,
        initial: req.body.name,
        name: req.body.name
    });
    newCategory.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//get by (id)
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

//patch by id
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Category.update({ _id: id }, { $set: updateOps })
         .exec()
         .then(result => {
            res.status(200).json(result);
        })
         .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

//delete
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Category.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;