import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { User } from "../models/user.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  user = new User();
  users: User[];

  resetUser() {
    this.user = new User();
  }

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };

  signup(user: User) {
    return this.http.post(
      environment.userUrl + "/signup",
      user,
      this.noAuthHeader
    );
  }

  signin(user: User) {
    return this.http.post(
      environment.userUrl + "/authenticate",
      user,
      this.noAuthHeader
    );
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
  }

  getUserPayLoad() {
    let token = this.getToken();

    if (token) {
      let userPayLoad = atob(token.split(".")[1]);
      return JSON.parse(userPayLoad);
    } else return null;
  }

  isLoggedIn() {
    let userPayLoad = this.getUserPayLoad();

    if (userPayLoad) return userPayLoad.exp > Date.now() / 1000;
    else return false;
  }

  getUser() {
    return this.http.get(environment.userUrl + "/getUser");
  }

  getUsers() {
    return this.http.get(environment.userUrl + "/getUsers");
  }

  updateUser(user: User) {
    return this.http.put(environment.userUrl + "/updateUser", user);
  }

  changePassword(token, user: User) {
    return this.http.put(
      environment.userUrl + "/changePassword/" + token,
      user
    );
  }
}
