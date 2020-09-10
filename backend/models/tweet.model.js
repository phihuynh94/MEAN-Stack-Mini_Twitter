const mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: 'User ID can\'t be empty'
    },
    userFullName: {
        type: String,
        required: 'User fullname can\'t be empty'
    },
    tweet: {
        type: String,
        required: 'Tweet can\'t be empty'
    },
    hashtag: [{
        type: String
    }],
    postAt: {
        type: Date,
        required: 'Post time can\'t be empty'
    },
    userTags: [{
        type: String
    }]
});

module.exports = mongoose.model('Tweet', tweetSchema);