import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface IPayload {
  id: string;
  iat: number,
  exp: number
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token
    if(!token) throw new Error('Unathorized!')
    const payload = jwt.verify(token, process.env.TOKEN_SECRET as string) as IPayload
    req.userId = payload.id
    next();
    
  } catch (error) {
    console.log(error)
    if(error instanceof Error) {
      res.clearCookie("token")
      res.status(401).json({error:{message: error.message}})
    }

  }
  
}