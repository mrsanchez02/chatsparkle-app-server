import { FindManyOptions, FindOptionsWhere } from "typeorm";
import { Room } from "../../entities/Room.entity";

export default async(filter:FindOptionsWhere<Room>) => {
  try {
    const rooms = await Room.findBy(filter)
    return rooms
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Service error.'
      }
    }
  }
}