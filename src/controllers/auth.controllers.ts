import { Response, Request } from "express"
import { User } from "../entities/User.entity"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import getOneService from "../services/user/get-one.service" 
import { tokenSign } from "../helper/auth"

export const registerNewUser = async (req:Request, res:Response) => {
  const {firstName, lastName, email, password} = req.body

  try {
    const {error, user} = await getOneService({ where: {email}})
    if(!error && user) return res.status(409).json({error: {message: 'Email already exist.'}})
    
    const newUser = new User()
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.email = email
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    
    const token = tokenSign(newUser.id, '1h')
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    }).status(200).json({info:{message: "Login succesfully"}})

    res.header('auth-token', token).status(201).json({msg:"User created succesfully"})

  } catch (error) {
    res.status(500).json({error: {message: 'Error application'}})
  }
}

export const LoginUser = async (req:Request, res:Response) => {
  const {email, password} = req.body

  try {
    const {error, user} = await getOneService({ where: {email}})
    if(error||!user) return res.status(404).json({message: 'Wrong email or password.'})

    const rightPassword: boolean = await user.validatePassword(password)
    if(!rightPassword) return res.status(404).json({message: 'Wrong email or password.'})
    
    const token = tokenSign(user.id, 1000 * 60 * 60)
    res.cookie("token", token, {
      httpOnly: true,
    }).status(200).json({info:{message: "Login succesfully"}})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: {message: 'Error application'}})

  }

}

export const profile = async (req:Request, res:Response) => {
  try {
    const {error, user} = await getOneService({where: {id: req.userId}})
    if(error) return res.status(404).json({error: { message: "User doesn't exist!"}})
    
    res.json({user})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: { message: 'Error application'}})

  }

}