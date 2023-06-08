import { User } from "../../entities/User.entity" 
import { FindOneOptions } from "typeorm"

export default async (filter: FindOneOptions<User>) => {
  try {
    const user = await User.findOne(filter)
    return { user }
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Error service.'
      }
    }
  }
}