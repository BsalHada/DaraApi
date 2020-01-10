const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Users = require('../models/users');


// router.get('/',(req,res,next) => {
//             Users.find()
//             .exec()
//             .then(docs =>{
//                 console.log(docs);
//                 res.status(200).json(docs);
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                     error:err 
//                 });
//             });
// });


router.post('/',(req,res,next) => {
    const users = new Users({
        id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    });
    users.save().then(result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /users',
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

router.get('/:productID', (req,res,next) => {
         req.params.productID;
       const id = req.params.productID;
       Product.find({pid:id}).exec()
       .then(doc => {
           console.log("From database",doc);
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No valid entry found'
               });
           }
           
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});

router.patch('/:productID', (req,res,next) => {
    const id = req.params.productID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({pid: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        
    });
});

router.delete('/:productID', (req,res,next) => {
    const id = req.params.productID;
    Product.remove({pid: id})
        .exec()
        .then(result => {
                res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
module.exports = router;