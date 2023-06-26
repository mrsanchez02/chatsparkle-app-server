import { Request, Response } from "express";
import createOneService from "../services/room/create-one.service";
import getOneService from "../services/user/get-one.service";
import deleteOneService from "../services/room/delete-one.service";
import getAllByUserService from "../services/room/get-all-by-user.service";
import { Equal } from "typeorm";
import restoreOneService from "../services/room/restore-one.service";
import getOneByUserService from "../services/room/get-one-by-user.service";
import renameOneService from "../services/room/rename-one.service";

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
  const {id} = req.params

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

export const recoverRoom = async (req: Request, res: Response) => {
  const {id} = req.body

  try {
    const {error, user} = await getOneService({where: {id: req.userId}})
    if(!user || error) return res.status(404).json({error: { message: "User doesn't exist!"}})

    const roomToRestore = await restoreOneService(id)
    if(!roomToRestore.info || roomToRestore.error) return res.status(404).json({error: {message: roomToRestore.error.message }})

    res.status(202).json({info: {message: roomToRestore.info.message}})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: {message: 'Application error.'}})
  }
}

export const getAllRoomsActualUser = async (req: Request, res: Response) => {
  try {
    const {error, user} = await getOneService({where: {id: req.userId}})
    if(!user || error) return res.status(404).json({error: { message: "User doesn't exist!"}})

    if (user) {
      const roomList = await getAllByUserService({createdBy: Equal(user.id)})
      res.status(200).json(roomList)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error: {message: 'Application error.'}})
  }
}

export const getOneRoomActualuser = async (req: Request, res: Response) => {
  const roomId = req.params.id
  try {
    const {error, user} = await getOneService({where: {id: req.userId}})
    if(!user || error) return res.status(404).json({error: { message: "User doesn't exist!"}})

    if (user) {
      const room = await getAllByUserService({createdBy: Equal(user.id), id: roomId})
      res.status(200).json(room)
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({error: {message: 'Application error.'}})
  }
}

export const renameRoom = async (req: Request, res: Response) => {
  const {newName, id} = req.body
  try {
    const {error, user} = await getOneService({where: {id: req.userId}})
    if(!user || error) return res.status(404).json({error: { message: "User doesn't exist!"}})

    const roomRename = await renameOneService({ roomName: newName, filter: {where: {id}}})
    if (roomRename.error) return res.status(500).json({error: {message: 'Service error. 2'}})

    res.status(201).json({info: {message: roomRename.info.message}})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: {message: 'Application error.'}})
  }
}