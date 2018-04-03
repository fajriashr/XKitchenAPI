const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//User Model
const User = require('../models/user');
//get all
router.get('/', (req, res, next) => {
    User.find()
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
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        password: req.body.password,
        badgeId: req.body.badgeId,
        nick: req.body.nick,
        fullName: req.body.fullName
    });

    newUser.save()
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
    User.findById(id)
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

    User.update({ _id : id }, { $set : updateOps })
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
    User.remove({ _id : id })
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