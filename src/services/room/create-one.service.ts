import { MongoDriverError, QueryFailedError } from "typeorm";
import { Room } from "../../entities/Room.entity";
import { User } from "../../entities/User.entity";
import { UserRoom } from "../../entities/UserRoom.entity";
import getOneService from "./get-one.service";

interface NewRoom {
  name: string
  createdBy: User
}

export default async ({name, createdBy}: NewRoom) => {
  try {
    const {room, error} = await getOneService({where:{name}});
    if(room?.name) throw new Error("This room name already exist!");

    const newRoom = await Room.create({
      createdBy,
      name
    }).save();
    
    await UserRoom.create({
      room_id: newRoom.id,
      user_id: createdBy.id
    }).save()
    
    return { newRoom }
  } catch (error) {
    if(error instanceof Error){
      return {
        error: {
          message: error.message
        }
      }
    }
    return {
      error: {
        message: 'Service error.'
      }
    }

  }
}