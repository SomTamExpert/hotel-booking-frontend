import {Room} from "./room.model";

export class Category {
  id?: number;
  title?: string;
  description?: string;
  rating?: number;
  rooms?: Room[];
}
