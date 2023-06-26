import { Room } from "../../entities/Room.entity";
import getOneService from "./get-one.service";

export default async (id: string ) => {

  try {
    const {room, error} = await getOneService({where: {id}, withDeleted: true})
    
    if(!room||error) throw new Error("Room doesn't exist!");
    
    if (room) await room?.recover()
    
    return {
      info: {
        message: `The room ${id} was restored successfully.`
      }
    }
  } catch(error) {
    console.log(error)
    if (error instanceof Error ) {
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