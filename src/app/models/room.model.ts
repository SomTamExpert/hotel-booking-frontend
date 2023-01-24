import {Status} from "./status.model";
import {Category} from "./category.model";

export class Room {
  id?: number;
  capacity?: number;
  price?: string;
  balcony?: boolean;
  number?: number;
  status?: Status;
  category?: Category;
}
