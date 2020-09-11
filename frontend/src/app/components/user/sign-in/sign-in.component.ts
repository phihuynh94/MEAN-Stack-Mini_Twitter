import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorMessage: string;

  ngOnInit() {
    if(this.userService.isLoggedIn())
      this.router.navigateByUrl('/home');
  }

  onSubmit(){
    this.userService.user.email = this.userService.user.email.toLowerCase();
    
    this.userService.signin(this.userService.user).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/home');
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
