import {Status} from "./status.model";
import {Room} from "./room.model";

export class Booking {
  id?: number;
  arrival?: Date;
  checkout?: Date;
  breakfast?: boolean;
  comment?: string;
  status?: Status;
  room?: Room;
}
