import { User } from "../../entities/User.entity";
import getOneService from "./get-one.service";

export default async (id: string ) => {

  try {
    const {user, error} = await getOneService({where: {id}, withDeleted: true})
    
    if(!user||error) throw new Error("user doesn't exist!")

    if(user.deletedAt===null) throw new Error("This user is active, no need to recover.")
    
    if (user) {
      await user?.recover()
      await User.update({id},{active: true})
    }
    
    return {
      info: {
        message: `The user ${user.userName} was restored successfully.`
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