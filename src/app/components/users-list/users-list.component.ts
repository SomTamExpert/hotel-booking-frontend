import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  isAdmin = false;
  lastname = ""
  loggedUser: any = {};

  constructor(private userService: UserService, private storageService: StorageService ) {
  }

  ngOnInit(): void {
    this.retrieveUsers();
    this.loggedUser = this.storageService.getUser();
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

  searchUser(): void {
    this.currentUser = {};
    this.currentIndex = -1;
    this.userService.getUsersByLastName(this.lastname)
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
