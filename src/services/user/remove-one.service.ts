import { FindOneOptions } from "typeorm"
import getOneService from "./get-one.service"
import { User } from "../../entities/User.entity";

export default async(filter: FindOneOptions) => {
  try {
    const {user, error} = await getOneService(filter)
    
    if(!user||error) throw new Error("User doesn't exist!")
    
    if (user) {
      await User.update({id:user.id},{active: false})
      await user.softRemove()
    }

    return {
      info: {
        message: `The user ${user.userName} was removed successfully.`
      }
    }
  } catch (error) {
    if(error instanceof Error) {
      return {
        error: {
          message: error.message
        }
      }
    }
  }
  
}