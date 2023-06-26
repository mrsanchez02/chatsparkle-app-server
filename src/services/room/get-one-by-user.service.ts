import { FindOneOptions } from "typeorm";
import { Room } from "../../entities/Room.entity";

export default async (filter: FindOneOptions<Room>) => {
  try {
    const room = await Room.findOne(filter)
    if(!room) return {
      error: {
        message: "Room doesn't exist."
      }
    }
    
    return {room}
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Service error.'
      }
    }
  }
}
