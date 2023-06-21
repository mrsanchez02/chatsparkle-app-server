import { Request, Response } from "express";
import createOneService from "../services/room/create-one.service";
import getOneService from "../services/user/get-one.service";
import deleteOneService from "../services/room/delete-one.service";

export const createNewRoom = async (req: Request, res: Response) => {
  const {name} = req.body

  try{
    const {error, user} = await getOneService({where: {id: req.userId}})
    if(!user || error) return res.status(404).json({error: { message: "User doesn't exist!"}})
    
    const newRoom = await createOneService({name, createdBy: user})
    if(newRoom.error || !newRoom.newRoom) return res.status(500).json({error: { message: newRoom.error.message}})
    
    res.status(201).json({info: {message: `${name} room was created.`}})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: {message: 'Application error.'}})
  }

}

export const removeRoom = async (req: Request, res: Response) => {
  const {id} = req.body

  try {
    const {error, user} = await getOneService({where: {id: req.userId}})
    if(!user || error) return res.status(404).json({error: { message: "User doesn't exist!"}})

    const roomToDelete = await deleteOneService(id)
    if(!roomToDelete.info || roomToDelete.error) return res.status(404).json({error: {message: roomToDelete.error.message }})

    res.status(202).json({info: {message: roomToDelete.info.message}})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: {message: 'Application error.'}})
  }
}