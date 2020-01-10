const express = require('express');
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/collections');
const userRoutes = require('./api/routes/users');

app.use('/uploads',express.static(__dirname+'/uploads/image'));
mongoose.connect('mongodb://localhost:27017/bishalDaraz', 
{ useNewUrlParser: true })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/productList', productRoutes);
app.use('/collectionsList', orderRoutes);
app.use('/userList', userRoutes);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
    
});

app.use((error, req,res,next) => {

        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
});
module.exports = app; 