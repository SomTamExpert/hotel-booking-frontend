import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Router} from "@angular/router";
import {Booking} from "../../models/booking.model";
import {Status} from "../../models/status.model";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  constructor(private bookingService: BookingService, private localStorage: StorageService, private router: Router) {
  }

  ;

  currenUser: any;
  booking: Booking = {
  }

  status: Status = {
    id: 1,
    status: 'pending'
  }

  submitted = false;

  ngOnInit(): void {
    this.currenUser = this.localStorage.getUser();
  }

  saveBooking(): void {
    const data = {
      arrival: this.booking.arrival,
      departure: this.booking.checkout,
      breakfast: this.booking.breakfast,
      comment: this.booking.comment,
      room: this.booking.room,
      status: this.status,
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
      this.router.navigate(['/bookings/user/' + this.currenUser.username]);

    }, 500);
  }


  newBooking(): void {
    this.submitted = false;
    this.booking = {
    };
  }


}
