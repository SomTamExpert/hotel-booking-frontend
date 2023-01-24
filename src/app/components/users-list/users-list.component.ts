import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  isAdmin = true;
  userName = ""
  loggedUser: any = {};

  constructor(private userService: UserService,) {
  }

  ngOnInit(): void {
    this.retrieveUsers();
    if (this.loggedUser.role == "ADMIN") {
      this.isAdmin = true;
    }
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  selectUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  retrieveUsers(): void {
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }

  removeUser(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchUsername(): void {
    this.currentUser = {};
    this.currentIndex = -1;
    this.userService.getUsersByUsername(this.userName)
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


}
