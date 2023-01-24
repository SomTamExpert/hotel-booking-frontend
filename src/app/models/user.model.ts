import {Booking} from "./booking.model";

export class User {
  id?: number;
  lastname?: string;
  firstname?: string;
  password?: string;
  email?: string;
  role?: string;
  bookings?: Booking[];
}
