import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }


  currentUser: User = {};

  message = '';

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id: number): void {
    this.userService.getUserById(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    this.userService.updateUser(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The User was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  removeUser(): void {
    this.userService.deleteUser(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The User was deleted successfully!';
        },
        error => {
          console.log(error);
        });
  }

}
