import 'dotenv/config'
import { Request, Response } from "express"
import { tokenSign } from "../helper/auth"
import createOneService from "../services/user/create-one.service"
import getOneService from "../services/user/get-one.service"

export const registerNewUser = async (req:Request, res:Response) => {
  const { email } = req.body

  try {
    const {error, user} = await getOneService({ where: {email}})
    if(!error && user) return res.status(409).json({error: {message: 'Email already exist.'}})
    
    const createUser = await createOneService(req.body)
    if(error || !createUser) return res.status(500).json({message: 'Error service.'})

    const token = tokenSign(createUser.newUser?.id || '', '1h')
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    }).status(201).json({msg:"User created succesfully"})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: {message: 'Application error.'}})
    
  }
}

export const LoginUser = async (req:Request, res:Response) => {
  const {email, password} = req.body

  try {
    const {error, user} = await getOneService({ where: {email}, select: ['password']})
    if(error||!user) return res.status(404).json({message: 'Wrong email or password.'})

    const rightPassword: boolean = await user.validatePassword(password)
    if(!rightPassword) return res.status(404).json({message: 'Wrong email or password.'})

    const token = tokenSign(user.id, 1000 * 60 * 60)
    res.cookie("token", token, {
      httpOnly: true,
    }).status(200).json({info:{message: "Login succesfully"}})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: {message: 'Application error.'}})

  }

}

export const profile = async (req:Request, res:Response) => {
  try {
    const {error, user} = await getOneService({where: {id: req.userId}})
    if(error) return res.status(404).json({error: { message: "User doesn't exist!"}})
    res.json({user})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: { message: 'Application error.'}})

  }

}

export const logoutUser = async (req:Request, res:Response) => {
  try {
    res.clearCookie("token")
    res.status(200).json({info:{message: "User logout successfully"}})
  
  } catch (error) {
    console.log(error)
    res.status(500).json({error: { message: 'Application error.'}})
  
  }
}
