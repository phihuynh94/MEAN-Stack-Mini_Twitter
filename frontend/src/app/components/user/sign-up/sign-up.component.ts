import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from "../../../shared/services/user.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  fullNameRegex = /^[a-zA-Z ]+$/;
  usernameRegex = /^[A-Za-z0-9_]+$/;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])/;
  successMessage: string;
  errorMessage: string;
  confirmPassword: string;

  ngOnInit() {
    if (this.userService.isLoggedIn()) this.router.navigateByUrl("/home");
  }

  onSubmit(form: NgForm) {
    if (this.userService.user.password == this.confirmPassword) {
      this.userService.signup(this.userService.user).subscribe(
        (res) => {
          this.successMessage = "Sign-up successfully";
          setTimeout(() => (this.successMessage = ""), 2000);
          this.resetForm(form);
          setTimeout(() => this.router.navigateByUrl("/signin"), 2000);
        },
        (err) => {
          if (err.status === 422) {
            this.errorMessage = err.error.join("<br/>");
          } else {
            this.errorMessage = err.error.text;
          }
        }
      );
    } else {
      this.errorMessage = "Confirm password does not match.";
    }
  }

  resetForm(form: NgForm) {
    this.userService.resetUser();
    form.resetForm();
    this.errorMessage = "";
  }
}
