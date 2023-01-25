import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../models/booking.model";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseURL = 'http://localhost:8080/bookings';

  constructor(private httpClient: HttpClient) {
  }


  getBookingById(id: number): Observable<Booking> {
    return this.httpClient.get<Booking>(this.baseURL + "/" + id);
  }

  getBookingsByUsername(username: string | null): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.baseURL + "/user/" + username);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.httpClient.post<Booking>(this.baseURL, booking);
  }

  updateBooking(id: number | undefined, booking: Booking): Observable<Booking> {
    return this.httpClient.put<Booking>(this.baseURL + "/" + id, booking);
  }

  cancelBooking(id: number | undefined, booking: Booking): Observable<any> {
    return this.httpClient.put(this.baseURL + "/cancel/" + id, booking);
  }

  deleteBooking(id: number | undefined): Observable<any> {
    return this.httpClient.delete(this.baseURL + "/" + id);
  }

  getBookingsByTitle(username: string | null, title: string | null): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${this.baseURL}/user/${username}?title=${title}`);
  }

  confirmBooking(id: number | undefined, booking: Booking): Observable<any> {
    return this.httpClient.put(this.baseURL + "/confirm/" + id, booking);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.baseURL);
  }

}
