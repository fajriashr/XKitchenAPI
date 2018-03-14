const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//user model

const User = require('../models/user');

router.get('/', (req, res, next)=>{
    User.find()
        .exec()
        .then(result =>{
            res.status(200).json(result)
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : error
            });
        });
});

//get all
router.post('/', (req, res, next) => {
    const newUser = new User({
    _id : new mongoose.Types.ObjectId() ,
    userId : req.body.userId,
    password : req.body.password,
    badgeId : req.body.badgeId,
    nick : req.body.nick,
    fullName : req.body.fullName
    });

    newUser.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        });

});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

router.patch('/:id', (req, res, next)=>{
    const id = req.params.id;
    const updateOps = {};

    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    User.update({_id : id}, {$set : updateOps})
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
})

router.delete('/:id', (req, res, next)=>{
    const id = req.params.id;
    User.remove({_id : id})
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
})

module.exports = router;