import { Component, OnInit, OnDestroy } from "@angular/core";

import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user.model";
import { TweetService } from "src/app/shared/services/tweet.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"],
})
export class SideBarComponent implements OnInit, OnDestroy {
  constructor(
    public userService: UserService,
    private tweetService: TweetService
  ) {}

  hashtags: string[] = [];
  getHashTagsInterval;

  ngOnInit() {
    this.userService.getUsers().subscribe((res) => {
      this.userService.users = res as User[];
    });

    this.getHashTags();

    this.getHashTagsInterval = setInterval(() => {
      this.getHashTags();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.getHashTagsInterval);
  }

  getHashTags() {
    this.tweetService.getHashTags().subscribe((res) => {
      this.hashtags = res as string[];
    });
  }
}
