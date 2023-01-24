import {Component, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {BookingService} from "../../services/booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings?: Booking[];
  title = '';
  currentBooking: Booking = {};
  currentIndex = -1;

  dateTimeString = "";

  constructor(private localStorage: StorageService, private bookingService: BookingService, private route: ActivatedRoute, private router: Router) {
  }

  currentUser: any;
  role = "";
  isAdmin = false;

  ngOnInit(): void {
    this.currentUser = this.localStorage.getUser();
    console.log("current user ", this.currentUser);
    this.retrieveBookingsByUsername();
    this.role = this.currentUser.role.toLowerCase();
    if (this.currentUser.role == "ADMIN") {
      this.isAdmin = true;
    }
  }
  selectBooking(booking: Booking, index: number): void {
    this.currentBooking = booking;
    this.currentIndex = index;
  }

  retrieveBookingsByUsername(): void {
    console.log(this.currentUser.email);
    this.bookingService.getBookingsByUsername(this.currentUser.email)
      .subscribe(
        data => {
          this.bookings = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }
  searchName(): void {
    this.currentBooking = {};
    this.currentIndex = -1;
    this.bookingService.getBookingsByTitle(this.currentUser.email, this.title)
      .subscribe(
        data => {
          this.bookings = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }
  cancelBooking(): void {
    this.bookingService.cancelBooking(this.currentBooking.id, this.currentBooking)
      .subscribe(
        response => {
          console.log(response);
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }

  confirmBooking(): void {
    this.bookingService.confirmBooking(this.currentBooking.id, this.currentBooking)
      .subscribe(
        response => {
          console.log(response);
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }
  formatDateTime(date: Date | undefined ): string {
    if (date) {
      this.dateTimeString =  new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
      return this.dateTimeString;
    }
    return '';
  }

}
