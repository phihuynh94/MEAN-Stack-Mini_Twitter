import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../shared/services/user.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((res) => {
      this.userService.user = res["user"];
    });
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigateByUrl("/signin");
  }
}
