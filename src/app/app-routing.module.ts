import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {BookingDetailsComponent} from "./components/booking-details/booking-details.component";
import {BookingListComponent} from "./components/booking-list/booking-list.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: "bookings", component: BookingListComponent },
  { path: "bookings/:id", component: BookingDetailsComponent },
  { path: "bookings/user/:username", component: BookingListComponent },
  {path: "login", component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
