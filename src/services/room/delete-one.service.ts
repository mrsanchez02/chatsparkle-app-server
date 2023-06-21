import getOneService from "./get-one.service";

export default async (id: string ) => {
  try {
    const {room, error} = await getOneService({where: {id}})
    if(error || !room) throw new Error("Room doesn't exist!");
    room.softRemove()
    return {
      info: {
        message: 'Room removed succesfully.'
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