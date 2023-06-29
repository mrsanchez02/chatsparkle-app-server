import { FindOneOptions } from "typeorm";
import { Room } from "../../entities/Room.entity";
import getOneByUserService from "./get-one-by-user.service";

export default async ({filter, roomName}: {filter: FindOneOptions<Room>, roomName: string} ) => {
  try {
    const { room, error } = await getOneByUserService(filter)
    if (error) throw new Error(error.message);
    
    const updated = await Room.update({id: room.id},{name: roomName})

    if(!updated) return {
      error: {
        message: "Room not updated."
      }
    }

    return {info:{message: "Room updated successfully"}}

  } catch (error) {
    if (error instanceof Error) {
      return {
        error:
        {
          message: error.message
        }
      }
    }
    return {
      error:
      {
        message: 'Service error.'
      }
    }
  }
}
