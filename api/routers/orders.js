const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req, res, next) => {
    Order.find()
        .populate({ path: 'reservation', select: 'guest reference date' })
        .populate({ path: 'product', select: 'code initial name description' })
        .populate({ path: 'user', select: 'userId badgeId password  nick fullName' })
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

router.post('/', (req, res, next) =>{
    const newOrder = new Order({
        _id : new mongoose.Types.ObjectId(),
        reservation : req.body.reservation,
        product : req.body.product,
        user : req.body.user,
        quantity : req.body.quantity,
        createDate: req.body.createDate,
        lastStatus: req.body.lastStatus,
        lastTime: req.body.lastTime
    })
    newOrder.save()
    .then(doc =>{
        console.log(doc);
        res.status(201).json(doc);
    })
    .catch(err =>{
        console.log(doc);
        res.status(500).json({
            error: err
        });
    })
})

router.get('/:id', (req, res, next) =>{
    const id = req.params.id;
    Order.findById(id)
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})
