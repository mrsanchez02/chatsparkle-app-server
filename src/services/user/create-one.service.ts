import { QueryFailedError } from "typeorm"
import { User } from "../../entities/User.entity" 

interface NewUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  userName: string
}

export default async ({ firstName, lastName, email, password, userName }: NewUser) => {
  try {
    const newUser = new User()
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.userName = userName
    newUser.email = email
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save().catch((error)=> {
      if(error instanceof QueryFailedError){
        console.log('====================================');
        console.log(error.driverError.detail);
        console.log('====================================');
      }
    })
    return { newUser }
  } catch (error) {
    console.log(error)
    if(error instanceof Error) {
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