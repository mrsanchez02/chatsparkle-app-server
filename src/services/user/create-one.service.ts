import { User } from "../../entities/User.entity" 

interface NewUser {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

export default async ({ firstName, lastName, email, password }: NewUser) => {
  try {
    const newUser = new User()
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.email = email
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    return { newUser }
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Error service.'
      }
    }
  }
}