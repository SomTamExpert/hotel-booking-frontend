import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  user: User = {};

  ngOnInit(): void {
  }

  saveUser(user: User): void {
    user = {
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role = "MEMBER"
    }
    console.log("user email: " + user.email + " user password" + user.password + " user role: " + user.role + " user firstname: " + user.firstname + " user lastname: " + user.lastname);
    this.authService.register(user)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);

        });
  }

}
