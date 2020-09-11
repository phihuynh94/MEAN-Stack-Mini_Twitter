import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor(public userService: UserService) {}

  successMessage: string;
  errorMessage: string;
  fullNameRegex = /^[a-zA-Z ]+$/;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])/;
  newPassword: string;
  confirmNewPassword: string;

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((res) => {
      this.userService.user = res["user"];
    });
  }

  onUpdateUser() {
    this.userService.updateUser(this.userService.user).subscribe(
      (res) => {
        this.successMessage = "Update successfully";
        setTimeout(() => (this.successMessage = ""), 2000);
        this.errorMessage = "";
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  onChangePassword() {
    if (this.newPassword == this.confirmNewPassword) {
      this.userService.signin(this.userService.user).subscribe(
        (res) => {
          let token = res;
          this.userService.user.password = this.newPassword;

          this.userService
            .changePassword(token, this.userService.user)
            .subscribe(
              (res) => {
                this.successMessage = "Change password successfully";
                setTimeout(() => (this.successMessage = ""), 2000);
              },
              (err) => {
                this.errorMessage = err.error.message;
              }
            );
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    } else {
      this.errorMessage =
        "Confirm new password and new password are not the same.";
    }
  }
}
