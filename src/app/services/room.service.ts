import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseURL = 'http://localhost:8080/rooms';

  constructor(private httpClient: HttpClient) {
  }

  getRoomById(id: number): Observable<Room> {
    return this.httpClient.get<Room>(this.baseURL + "/" + id);
  }

  getRoomsByCategory(category: string | null): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.baseURL + "/category/" + category);
  }

  createRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(this.baseURL, room);
  }

  updateRoom(id: number | undefined, room: Room): Observable<Room> {
    return this.httpClient.put<Room>(this.baseURL + "/" + id, room);
  }

  deleteRoom(id: number | undefined): Observable<any> {
    return this.httpClient.delete(this.baseURL + "/" + id);
  }

  getAllRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.baseURL);
  }

}
