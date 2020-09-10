const mongoose = require('mongoose');

var hashtagSchema = new mongoose.Schema({
    hashtag: {
        type: String
    },
    count: {
        type: Number
    }
});

module.exports = mongoose.model('Hashtag', hashtagSchema);