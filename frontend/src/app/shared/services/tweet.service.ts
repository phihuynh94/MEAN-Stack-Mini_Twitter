import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Tweet } from "../models/tweet.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class TweetService {
  constructor(private http: HttpClient) {}

  tweet = new Tweet();
  tweets: Tweet[];

  resetTweet() {
    this.tweet = new Tweet();
  }

  postTweet(tweet: Tweet) {
    return this.http.post(environment.tweetUrl + "/postTweet", tweet);
  }

  getTweets() {
    return this.http.get(environment.tweetUrl + "/getTweets");
  }

  getHashTags() {
    return this.http.get(environment.tweetUrl + "/getHashTags");
  }
}
