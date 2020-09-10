const tweetRouter = require("express").Router();
const Tweet = require("../models/tweet.model");
const Hashtag = require("../models/hashtag.model");
const auth = require("../config/auth");

tweetRouter.post("/postTweet", auth, (req, res) => {
  var tweet = new Tweet();
  tweet.userId = req.body.userId;
  tweet.userFullName = req.body.userFullName;
  tweet.tweet = req.body.tweet;
  tweet.hashtag = tweet.tweet.split(" ").filter((v) => v.startsWith("#"));
  tweet.userTags = tweet.tweet.split(" ").filter((v) => v.startsWith("@"));
  tweet.postAt = new Date();

  if (tweet.tweet.replace(/ /g, "").length <= 280) {
    tweet.save((err, tweet) => {
      if (!err) {
        if (tweet.hashtag[0] != "") {
          for (let i in tweet.hashtag) {
            Hashtag.findOne({ hashtag: tweet.hashtag[i] }, (err, hashtag) => {
              if (!err) {
                if (hashtag != null) {
                  hashtag.count += 1;

                  hashtag.updateOne({ $set: hashtag }, () => {});
                } else {
                  var hashtags = new Hashtag();

                  hashtags.hashtag = tweet.hashtag[i];
                  hashtags.count = 1;

                  hashtags.save(() => {});
                }
              }
            });
          }
        }
        res.send(tweet);
      } else {
        res.send(err);
      }
    });
  }
});

tweetRouter.get("/getTweets", (req, res) => {
  Tweet.find((err, tweets) => {
    if (!err) {
      res.send(tweets);
    } else {
      res.send(err);
    }
  }).sort({ postAt: -1 });
});

tweetRouter.get("/getHashTags", auth, (req, res) => {
  Hashtag.find((err, hashtags) => {
    if (!err) {
      res.send(hashtags);
    } else {
      res.send(err);
    }
  }).sort({ count: "desc" });
});

module.exports = tweetRouter;
