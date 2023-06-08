import jwt from "jsonwebtoken"

export const tokenSign = (id: string, expiresIn: number | string) => {
  const signedToken = jwt.sign({id}, process.env.TOKEN_SECRET as string, {
    expiresIn
  })

  return signedToken
}