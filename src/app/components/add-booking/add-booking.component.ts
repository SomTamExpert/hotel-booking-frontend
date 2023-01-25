import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Router} from "@angular/router";
import {Booking} from "../../models/booking.model";
import {Status} from "../../models/status.model";
import {StorageService} from "../../services/storage.service";
import {User} from "../../models/user.model";
import {Room} from "../../models/room.model";
import {RoomService} from "../../services/room.service";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  constructor(private roomService: RoomService, private bookingService: BookingService, private localStorage: StorageService, private router: Router) {
  }

  currenUser: User = {};
  booking: Booking = {};
  rooms?: Room[];

  status: Status = {
    id: 1,
    status: 'pending'
  }

  submitted = false;

  ngOnInit(): void {
    this.currenUser = this.localStorage.getUser();
    this.retrieveRooms();
  }

  saveBooking(): void {
    const data = {
      arrival: new Date(),
      checkout: new Date(),
      breakfast: this.booking.breakfast,
      comment: this.booking.comment,
      room: this.booking.room,
      status: this.status,
      user: this.currenUser
    };
    console.log("booking date to save", data);
    this.bookingService.createBooking(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
    setTimeout(() => {
      this.router.navigate(['/bookings/user/' + this.currenUser.email]);

    }, 500);
  }


  newBooking(): void {
    this.submitted = false;
    this.booking = {};
  }

  retrieveRooms(): void {
    this.roomService.getAllRooms()
      .subscribe(
        data => {
          this.rooms = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


}
