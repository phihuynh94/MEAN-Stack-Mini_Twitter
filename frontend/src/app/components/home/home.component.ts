import { Component, OnInit, OnDestroy } from "@angular/core";

import { UserService } from "../../shared/services/user.service";
import { TweetService } from "../../shared/services/tweet.service";
import { Tweet } from "src/app/shared/models/tweet.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    public tweetService: TweetService
  ) {}

  tweetLength: number = 0;
  postAt: string[] = [];
  getTweetInterval;

  ngOnInit() {
    this.getUser();
    this.getTweets();

    this.getTweetInterval = setInterval(() => {
      this.getTweets();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.getTweetInterval);
  }

  getUser() {
    this.userService.getUser().subscribe((res) => {
      this.userService.user = res["user"];
    });
  }

  onTweet() {
    if (this.tweetLength <= 280) {
      this.tweetService.tweet.userId = this.userService.user.id;
      this.tweetService.tweet.userFullName = this.userService.user.fullName;

      this.tweetService.postTweet(this.tweetService.tweet).subscribe((res) => {
        this.tweetService.resetTweet();
        this.tweetLength = 0;
        this.getTweets();
      });
    }
  }

  getTweets() {
    this.tweetService.getTweets().subscribe((res) => {
      this.tweetService.tweets = res as Tweet[];
      this.postAt = [];

      for (var i = 0; i < this.tweetService.tweets.length; i++) {
        this.calculateSince(this.tweetService.tweets[i].postAt);
      }
    });
  }

  countChar(tweet) {
    this.tweetLength = tweet.replace(/ /g, "").length;
  }

  calculateSince(postAt) {
    var tTime = new Date(postAt).getTime();
    var cTime = new Date().getTime();
    var sinceMin = Math.round((cTime - tTime) / 60000);

    if (sinceMin == 0) {
      var sinceSec = Math.round((cTime - tTime) / 1000);
      if (sinceSec < 10) var since = "now";
      else var since = "half a minute ago";
    } else if (sinceMin == 1) {
      var sinceSec = Math.round((cTime - tTime) / 1000);
      if (sinceSec == 30) var since = "half a minute ago";
      else if (sinceSec < 60) var since = "less than a minute ago";
      else var since = "1 minute ago";
    } else if (sinceMin < 45) var since = sinceMin + " minutes ago";
    else if (sinceMin > 44 && sinceMin < 60) var since = "about 1 hour ago";
    else if (sinceMin < 1440) {
      var sinceHr = Math.round(sinceMin / 60);
      if (sinceHr == 1) var since = "about 1 hour ago";
      else var since = "about " + sinceHr + " hours ago";
    } else if (sinceMin > 1439 && sinceMin < 2880) var since = "1 day ago";
    else {
      var sinceDay = Math.round(sinceMin / 1440);
      var since = sinceDay + " days ago";
    }

    this.postAt.push(since);
  }
}
