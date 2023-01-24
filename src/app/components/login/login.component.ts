import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private storageService: StorageService, private userService: UserService, private router: Router) {
  }

  loginFailed = false;
  isLoggedIn = false
  user: User = {};

  roles: string[] = [];

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.roles = this.storageService.getUser().roles;
  }

  verifyUserCredentials(user: User): void {
    user = {
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role
    }
    console.log("user email: " + user.email + " user password" + user.password + " user role: " + user.role + " user firstname: " + user.firstname + " user lastname: " + user.lastname);
    this.authService.login(user)
      .subscribe(
        (response: any) => {
          this.storageService.saveUser(response);
          this.loginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/bookings/user/'+ response.email]);
        },
        error => {
          console.log(error);
          this.loginFailed = true;
          console.log("login failed", this.loginFailed);
        });
  }

  register(): void {
    this.router.navigate(['/add-user']);
  }


}
