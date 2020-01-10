const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    email: String,
    password: String
});


module.exports = mongoose.model('users', productSchema);