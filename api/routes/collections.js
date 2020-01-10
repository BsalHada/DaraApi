const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Collection = require('../models/collections');


// collection api -> added
router.get('/',(req,res,next) => {
    Collection.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err 
        });
    });
});

router.post('/',(req,res,next) => {


    const collection = new Collection({
        id: new mongoose.Types.ObjectId(),
        image: req.body.image,
        c_title: req.body.c_title,
        c_intro:req.body.c_intro
    });
    collection.save().then(result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /collections',
                createdProduct: result
        });

    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
        
   
    
    

});



module.exports = router;