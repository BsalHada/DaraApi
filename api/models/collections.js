const mongoose = require('mongoose');
const collectionSchema = mongoose.Schema({
    image: String,
    c_title: String,
    c_intro: String
});


module.exports = mongoose.model('collection', collectionSchema);