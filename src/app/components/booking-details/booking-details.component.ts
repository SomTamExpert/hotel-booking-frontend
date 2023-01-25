import {Component, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {BookingService} from "../../services/booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {


  currentBooking: Booking = {};

  currentUser: any = {};

  message = '';
  dateTimeString ="";

  isAdmin = false;

  constructor(private bookingService: BookingService, private  localStorage: StorageService,  private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.message = '';
    this.getBooking(this.route.snapshot.params['id']);
    this.currentUser = this.localStorage.getUser();
    if (this.currentUser.role == "ADMIN") {
      this.isAdmin = true;
    }
  }

  getBooking(id: number): void {
    this.bookingService.getBookingById(id)
      .subscribe(
        data => {
          this.currentBooking = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateBooking(): void {
    console.log(this.currentBooking);
    const data = {
      arrival: this.currentBooking.arrival,
      checkout: this.currentBooking.checkout,
      breakfast: this.currentBooking.breakfast,
      comment: this.currentBooking.comment,
      status: this.currentBooking.status,
      room: this.currentBooking.room,
    }
    this.bookingService.updateBooking(this.currentBooking.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The Booking was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  removeBooking(): void {
    this.bookingService.deleteBooking(this.currentBooking.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/bookings']);
        },
        error => {
          console.log(error);
        });
  }

  cancelBooking(): void {
    this.bookingService.cancelBooking(this.currentBooking.id, this.currentBooking)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/bookings']);
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

}
