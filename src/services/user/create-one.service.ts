import { User } from "../../entities/User.entity" 

interface NewUser {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userName: ""
}

export default async ({ firstName, lastName, email, password, userName }: NewUser) => {
  try {
    const newUser = new User()
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.userName = userName
    newUser.email = email
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    return { newUser }
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Service error.'
      }
    }
  }
}